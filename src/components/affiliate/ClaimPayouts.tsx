import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { useWeb3 } from '../../hooks/useWeb3';

interface ClaimableSale {
  id: number;
  campaignAddress: string;
  saleAmount: string;
  commissionAmount: string;
  timestamp: number;
  clearingPeriod: number;
}

export const ClaimPayouts = () => {
  const [isClaiming, setIsClaiming] = useState(false);
  const { getCampaignContract } = useWeb3();

  // Mock data - in real app, this would come from the contract
  const mockClaimableSales: ClaimableSale[] = [
    {
      id: 1,
      campaignAddress: '0xabc123...',
      saleAmount: '100.0',
      commissionAmount: '10.0',
      timestamp: Date.now() / 1000 - 1209600, // 14 days ago
      clearingPeriod: 604800 // 7 days
    },
    {
      id: 2,
      campaignAddress: '0xdef456...',
      saleAmount: '250.0',
      commissionAmount: '25.0',
      timestamp: Date.now() / 1000 - 864000, // 10 days ago
      clearingPeriod: 604800 // 7 days
    }
  ];

  const handleClaimCommission = async (saleId: number, campaignAddress: string) => {
    setIsClaiming(true);
    try {
      const campaignContract = getCampaignContract(campaignAddress);
      const tx = await campaignContract.claimCommission(saleId);
      await tx.wait();
      alert('Commission claimed successfully!');
    } catch (error) {
      console.error('Error claiming commission:', error);
      alert('Error claiming commission');
    } finally {
      setIsClaiming(false);
    }
  };

  const isSaleClaimable = (sale: ClaimableSale) => {
    const currentTime = Date.now() / 1000;
    return currentTime >= sale.timestamp + sale.clearingPeriod;
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const getTimeRemaining = (sale: ClaimableSale) => {
    const currentTime = Date.now() / 1000;
    const timeUntilClaimable = sale.timestamp + sale.clearingPeriod - currentTime;
    
    if (timeUntilClaimable <= 0) return 'Ready to claim';
    
    const days = Math.ceil(timeUntilClaimable / 86400);
    return `${days} day${days !== 1 ? 's' : ''} remaining`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Claim Payouts</CardTitle>
        <CardDescription>
          Claim your commission payouts after the clearing period has ended
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sale ID</TableHead>
              <TableHead>Sale Amount</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockClaimableSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.id}</TableCell>
                <TableCell>{sale.saleAmount} BDAG</TableCell>
                <TableCell>{sale.commissionAmount} BDAG</TableCell>
                <TableCell>{formatTimestamp(sale.timestamp)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    isSaleClaimable(sale)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {getTimeRemaining(sale)}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => handleClaimCommission(sale.id, sale.campaignAddress)}
                    disabled={!isSaleClaimable(sale) || isClaiming}
                  >
                    {isClaiming ? 'Claiming...' : 'Claim'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};