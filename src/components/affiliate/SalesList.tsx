import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { unwrapAESKey, decryptPayload } from "../../lib/crypto";

interface Sale {
  id: number;
  affiliate: string;
  saleAmount: string;
  commissionAmount: string;
  timestamp: number;
  claimed: boolean;
}

export const SalesList = () => {
  const [decryptedData, setDecryptedData] = useState<object | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);

  // Mock data - in real app, this would come from the contract
  const mockSales: Sale[] = [
    {
      id: 1,
      affiliate: "0x1234...5678",
      saleAmount: "100.0",
      commissionAmount: "10.0",
      timestamp: Date.now() / 1000 - 86400, // 1 day ago
      claimed: false,
    },
    {
      id: 2,
      affiliate: "0x1234...5678",
      saleAmount: "250.0",
      commissionAmount: "25.0",
      timestamp: Date.now() / 1000 - 172800, // 2 days ago
      claimed: true,
    },
  ];

  const handleDecrypt = async (saleId: number) => {
    setIsDecrypting(true);
    try {
      // TODO: Implement client-side decryption
      // 1. Get user's private key (from wallet/context)
      // 2. Unwrap 'affiliateWrappedKey' to get AES key
      // 3. Decrypt 'encryptedPayload' with AES key
      // 4. Display decrypted data in a Shadcn Dialog

      const decrypted = await decryptPayload(
        "STUB_ENCRYPTED_PAYLOAD",
        {} as CryptoKey,
      );
      setDecryptedData(decrypted);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error decrypting data:", error);
      alert("Error decrypting data");
    } finally {
      setIsDecrypting(false);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>My Sales</CardTitle>
          <CardDescription>
            View your sales and decrypt the encrypted data
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
              {mockSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.id}</TableCell>
                  <TableCell>{sale.saleAmount} BDAG</TableCell>
                  <TableCell>{sale.commissionAmount} BDAG</TableCell>
                  <TableCell>{formatTimestamp(sale.timestamp)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        sale.claimed
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {sale.claimed ? "Claimed" : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDecrypt(sale.id)}
                      disabled={isDecrypting}
                    >
                      {isDecrypting ? "Decrypting..." : "Decrypt"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decrypted Sale Data</DialogTitle>
            <DialogDescription>
              This is the decrypted sale information
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted p-4 rounded-lg">
            <pre className="text-sm">
              {JSON.stringify(decryptedData, null, 2)}
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
