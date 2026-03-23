import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const MobileEntryScreen = () => {
  const [mobile, setMobile] = useState('');
  const { adminMobile, setOtpSent } = useAuthStore();
  const navigate = useNavigate();

  const isValid = mobile.length === 10;

  const handleSendOtp = () => {
    if (mobile !== adminMobile) {
      toast({ title: 'Error', description: 'This mobile number is not registered as admin.', variant: 'destructive' });
      return;
    }
    setOtpSent(true);
    toast({ title: 'OTP Sent', description: 'A 6-digit OTP has been sent to your number.' });
    navigate('/otp', { state: { mobile } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary/5 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary flex items-center justify-center">
            <Leaf className="h-7 w-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl">FreshMart Admin</CardTitle>
          <p className="text-sm text-muted-foreground">Jaggayyapeta</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Mobile Number</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground font-medium">+91</span>
              <Input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Enter 10-digit mobile"
                className="flex-1"
              />
            </div>
          </div>
          <Button onClick={handleSendOtp} disabled={!isValid} className="w-full">
            Send OTP
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileEntryScreen;
