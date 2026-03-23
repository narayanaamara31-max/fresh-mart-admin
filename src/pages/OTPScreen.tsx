import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const OTPScreen = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = (location.state as any)?.mobile || '9999999999';

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    login(mobile);
    toast({ title: 'Welcome!', description: 'Logged in successfully.' });
    navigate('/', { replace: true });
  };

  const handleResend = () => {
    setTimer(30);
    setOtp(Array(6).fill(''));
    toast({ title: 'OTP Resent', description: 'A new OTP has been sent.' });
    inputRefs.current[0]?.focus();
  };

  const maskedMobile = `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary/5 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary flex items-center justify-center">
            <Leaf className="h-7 w-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl">Verify OTP</CardTitle>
          <p className="text-sm text-muted-foreground">Sent to {maskedMobile}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center gap-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-11 h-12 text-center text-lg font-semibold border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            ))}
          </div>
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          <Button onClick={handleVerify} className="w-full">
            Verify & Login
          </Button>
          <div className="text-center">
            {timer > 0 ? (
              <p className="text-sm text-muted-foreground">Resend OTP in {timer}s</p>
            ) : (
              <button onClick={handleResend} className="text-sm text-primary font-medium">
                Resend OTP
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPScreen;
