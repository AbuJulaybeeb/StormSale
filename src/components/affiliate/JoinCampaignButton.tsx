import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { useWeb3 } from '../../hooks/useWeb3';

export const JoinCampaignButton = () => {
  const [campaignAddress, setCampaignAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { factoryContract } = useWeb3();

  const handleJoinCampaign = async () => {
    if (!factoryContract || !campaignAddress) return;

    setIsLoading(true);
    try {
      const tx = await factoryContract.joinCampaign(campaignAddress);
      await tx.wait();
      alert('Successfully joined campaign!');
      setCampaignAddress('');
    } catch (error) {
      console.error('Error joining campaign:', error);
      alert('Error joining campaign');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Join Campaign</CardTitle>
        <CardDescription>
          Enter a campaign address to join as an affiliate
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="campaignAddress">Campaign Address</Label>
          <Input
            id="campaignAddress"
            value={campaignAddress}
            onChange={(e) => setCampaignAddress(e.target.value)}
            placeholder="0x..."
          />
        </div>

        <Button 
          onClick={handleJoinCampaign} 
          disabled={isLoading || !campaignAddress}
          className="w-full"
        >
          {isLoading ? 'Joining Campaign...' : 'Join Campaign'}
        </Button>
      </CardContent>
    </Card>
  );
};