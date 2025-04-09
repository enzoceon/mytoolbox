
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown, RefreshCw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
];

interface ExchangeRates {
  [key: string]: number;
}

// Mock data for exchange rates
// In a real application, this would come from an API
const mockExchangeRates: ExchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 151.57,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.90,
  CNY: 7.22,
  INR: 83.47, // Added Indian Rupee exchange rate
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [convertedAmount, setConvertedAmount] = useState<string>('');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch exchange rates (simulated)
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real app, you would fetch from an API like this:
        // const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        // const data = await response.json();
        // setExchangeRates(data.rates);
        
        // For demo purposes, we'll use mock data
        setExchangeRates(mockExchangeRates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        toast.error("Failed to fetch exchange rates");
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (exchangeRates && amount && fromCurrency && toCurrency) {
      const fromRate = exchangeRates[fromCurrency];
      const toRate = exchangeRates[toCurrency];
      const result = (parseFloat(amount) * toRate) / fromRate;
      
      if (!isNaN(result)) {
        // Format the result to handle different currencies appropriately
        if (toCurrency === 'JPY' || toCurrency === 'INR') {
          // No decimal for Yen and Rupee
          setConvertedAmount(result.toFixed(0));
        } else {
          setConvertedAmount(result.toFixed(2));
        }
      } else {
        setConvertedAmount('');
      }
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleRefreshRates = () => {
    setLoading(true);
    // Simulate refreshing rates
    setTimeout(() => {
      toast.success("Exchange rates updated");
      setLoading(false);
    }, 1000);
  };

  const getCurrencySymbol = (code: string): string => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : '';
  };

  return (
    <>
      <Helmet>
        <title>Currency Converter - Convert Between World Currencies | MyToolbox</title>
        <meta name="description" content="Convert between different currencies with our free online currency converter. Real-time exchange rates for USD, EUR, GBP, JPY, CAD, AUD, and more." />
        <meta name="keywords" content="currency converter, exchange rate calculator, USD to EUR, foreign exchange, forex calculator, money converter, free currency tool" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 py-8 px-4 md:py-12">
          <div className="max-w-3xl mx-auto">
            <BackButton />
            
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                Currency Converter
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Convert between different currencies with our free online currency converter. 
                Get real-time exchange rates for major world currencies.
              </p>
            </div>
            
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Convert Currency</CardTitle>
                    <CardDescription>Exchange rates updated regularly</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleRefreshRates} disabled={loading}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh Rates
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative mt-1">
                      <Input 
                        id="amount" 
                        type="number" 
                        min="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-8"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {getCurrencySymbol(fromCurrency)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fromCurrency">From</Label>
                      <Select 
                        value={fromCurrency} 
                        onValueChange={setFromCurrency}
                      >
                        <SelectTrigger id="fromCurrency" className="mt-1">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.symbol} {currency.code} - {currency.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:top-8">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={handleSwapCurrencies} 
                          className="h-8 w-8 rounded-full bg-muted"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div>
                        <Label htmlFor="toCurrency">To</Label>
                        <Select 
                          value={toCurrency} 
                          onValueChange={setToCurrency}
                        >
                          <SelectTrigger id="toCurrency" className="mt-1">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map((currency) => (
                              <SelectItem key={currency.code} value={currency.code}>
                                {currency.symbol} {currency.code} - {currency.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 pb-2">
                  <div className="border-t border-border pt-4">
                    <Label>Converted Amount</Label>
                    <div className="mt-1 h-14 flex items-center justify-center bg-muted/30 rounded-md">
                      {loading ? (
                        <Skeleton className="h-6 w-24" />
                      ) : (
                        <div className="text-2xl font-semibold">
                          {convertedAmount ? (
                            <>
                              {getCurrencySymbol(toCurrency)} {convertedAmount} {toCurrency}
                            </>
                          ) : (
                            <span className="text-muted-foreground">Enter an amount</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  <p>
                    Note: These exchange rates are for informational purposes only and may not be
                    the exact rates used for actual currency exchanges.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CurrencyConverter;
