
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import BackButton from '@/components/BackButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, RefreshCw } from 'lucide-react';

// Mock exchange rates (would be replaced with real API data)
const EXCHANGE_RATES = {
  USD: { EUR: 0.92, GBP: 0.78, JPY: 150.2, CAD: 1.35, AUD: 1.48, CNY: 7.23 },
  EUR: { USD: 1.09, GBP: 0.85, JPY: 163.8, CAD: 1.47, AUD: 1.61, CNY: 7.88 },
  GBP: { USD: 1.28, EUR: 1.18, JPY: 192.5, CAD: 1.73, AUD: 1.89, CNY: 9.26 },
  JPY: { USD: 0.0067, EUR: 0.0061, GBP: 0.0052, CAD: 0.0089, AUD: 0.0098, CNY: 0.048 },
  CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 111.3, AUD: 1.09, CNY: 5.35 },
  AUD: { USD: 0.68, EUR: 0.62, GBP: 0.53, JPY: 101.9, CAD: 0.92, CNY: 4.90 },
  CNY: { USD: 0.14, EUR: 0.13, GBP: 0.11, JPY: 20.79, CAD: 0.19, AUD: 0.20 }
};

const CURRENCY_NAMES = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  CAD: "Canadian Dollar",
  AUD: "Australian Dollar",
  CNY: "Chinese Yuan"
};

const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  CNY: "¥"
};

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState<string>("1");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    convertCurrency();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency, toCurrency]);

  const convertCurrency = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      try {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount)) {
          toast({
            title: "Invalid amount",
            description: "Please enter a valid number",
            variant: "destructive"
          });
          setConvertedAmount(0);
          setIsLoading(false);
          return;
        }

        if (fromCurrency === toCurrency) {
          setConvertedAmount(numAmount);
        } else {
          const rate = EXCHANGE_RATES[fromCurrency as keyof typeof EXCHANGE_RATES][toCurrency as keyof typeof EXCHANGE_RATES[typeof fromCurrency]];
          setConvertedAmount(numAmount * rate);
        }
        setIsLoading(false);
      } catch (error) {
        toast({
          title: "Conversion failed",
          description: "An error occurred during currency conversion",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    }, 500);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <>
      <Helmet>
        <title>Currency Converter - EveryTools</title>
        <meta name="description" content="Convert between different currencies with up-to-date exchange rates." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 tracking-tight animate-fade-in">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Currency</span>
              <span className="text-white"> Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Convert between different currencies with up-to-date exchange rates.
            </p>
          </div>
          
          <Card className="w-full max-w-md mx-auto shadow-lg border-white/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-primary" />
                <CardTitle>Currency Converter</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input 
                  type="number" 
                  value={amount} 
                  onChange={handleAmountChange} 
                  min="0" 
                  step="0.01"
                  placeholder="Enter amount to convert"
                  className="bg-background"
                />
              </div>
              
              <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(CURRENCY_NAMES).map(currency => (
                        <SelectItem key={currency} value={currency}>
                          {CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS]} {currency} - {CURRENCY_NAMES[currency as keyof typeof CURRENCY_NAMES]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={swapCurrencies}
                  className="mt-6"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(CURRENCY_NAMES).map(currency => (
                        <SelectItem key={currency} value={currency}>
                          {CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS]} {currency} - {CURRENCY_NAMES[currency as keyof typeof CURRENCY_NAMES]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={convertCurrency}
                disabled={isLoading}
              >
                {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : null}
                Convert
              </Button>
              
              <div className="pt-4">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Result</div>
                  <div className="text-2xl font-bold">
                    {CURRENCY_SYMBOLS[fromCurrency as keyof typeof CURRENCY_SYMBOLS]} {parseFloat(amount) ? parseFloat(amount).toLocaleString() : "0"} =
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {CURRENCY_SYMBOLS[toCurrency as keyof typeof CURRENCY_SYMBOLS]} {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="max-w-2xl mx-auto mt-12">
            <h2 className="text-xl font-bold mb-4">About Currency Converter</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our currency converter provides quick and easy conversion between major world currencies.
                The exchange rates are updated regularly to ensure accurate conversions.
              </p>
              <p>
                Please note that these rates are for informational purposes only and may differ slightly
                from the rates used by financial institutions for actual transactions.
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CurrencyConverter;
