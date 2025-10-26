import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { InputGroup, InputField } from '../../components/ui/input-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { useWeb3 } from '../../hooks/useWeb3';
import { useNotification } from '../../context/NotificationContext';
import { wrapAESKey, getPublicKeyForAddress } from '../../lib/crypto';
import { Eye, Shield, UserCheck } from 'lucide-react';

export const GrantAccessForm = () => {
  const [saleId, setSaleId] = useState('');
  const [auditorAddress, setAuditorAddress] = useState('');
  const [campaignAddress, setCampaignAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { getCampaignContract } = useWeb3();
  const { showNotification } = useNotification();

  const handleGrantAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!saleId || !auditorAddress || !campaignAddress) {
      showNotification({
        type: 'warning',
        title: 'Missing Information',
        message: 'Please fill all required fields'
      });
      return;
    }

    setIsLoading(true);
    try {
      const campaignContract = getCampaignContract(campaignAddress);

      showNotification({
        type: 'info',
        title: 'Preparing Access',
        message: 'Setting up auditor permissions...'
      });

      // TODO: Implement proper key wrapping for auditor
      const auditorPublicKey = await getPublicKeyForAddress(auditorAddress);
      const auditorWrappedKey = await wrapAESKey({} as CryptoKey, auditorPublicKey);

      showNotification({
        type: 'info',
        title: 'Transaction Submitted',
        message: 'Granting audit access...'
      });

      const tx = await campaignContract.grantAuditAccess(
        saleId,
        auditorAddress,
        auditorWrappedKey
      );
      
      await tx.wait();
      
      showNotification({
        type: 'success',
        title: 'Access Granted!',
        message: 'Auditor can now access the encrypted sale data'
      });
      
      // Reset form
      setSaleId('');
      setAuditorAddress('');
      setCampaignAddress('');
    } catch (error: any) {
      console.error('Error granting audit access:', error);
      showNotification({
        type: 'error',
        title: 'Access Grant Failed',
        message: error.message || 'Failed to grant audit access'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Grant Audit Access
        </h2>
        <p className="text-muted-foreground mt-2">
          Provide auditors with secure access to encrypted sale data
        </p>
      </div>

      <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Auditor Access Control</CardTitle>
              <CardDescription>Grant secure data access to authorized auditors</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleGrantAccess}>
            <InputGroup className="space-y-6">
              <InputField 
                label="Campaign Address" 
                description="The campaign containing the sale data"
                required
              >
                <Input
                  value={campaignAddress}
                  onChange={(e) => setCampaignAddress(e.target.value)}
                  placeholder="0x742d35Cc6634C0532925a3b8..."
                  required
                />
              </InputField>

              <div className="grid md:grid-cols-2 gap-6">
                <InputField 
                  label="Sale ID" 
                  description="The specific sale to grant access to"
                  required
                >
                  <Input
                    type="number"
                    min="1"
                    value={saleId}
                    onChange={(e) => setSaleId(e.target.value)}
                    placeholder="e.g., 123"
                    required
                  />
                </InputField>

                <InputField 
                  label="Auditor Address" 
                  description="The auditor's wallet address"
                  required
                >
                  <Input
                    value={auditorAddress}
                    onChange={(e) => setAuditorAddress(e.target.value)}
                    placeholder="0x..."
                    required
                  />
                </InputField>
              </div>

              {/* Security Notice */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Security Notice</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      Only grant access to verified auditors. The auditor will be able to decrypt 
                      and view the sale data using their private key.
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full h-14 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Granting Access...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-5 h-5" />
                    <span>Grant Audit Access</span>
                  </div>
                )}
              </Button>
            </InputGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};