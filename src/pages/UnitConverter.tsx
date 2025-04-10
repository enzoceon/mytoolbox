
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// Define conversion types and their units
const conversionTypes = [
  {
    id: 'length',
    name: 'Length',
    units: [
      { id: 'km', name: 'Kilometers (km)' },
      { id: 'm', name: 'Meters (m)' },
      { id: 'cm', name: 'Centimeters (cm)' },
      { id: 'mm', name: 'Millimeters (mm)' },
      { id: 'mi', name: 'Miles (mi)' },
      { id: 'yd', name: 'Yards (yd)' },
      { id: 'ft', name: 'Feet (ft)' },
      { id: 'in', name: 'Inches (in)' },
    ]
  },
  {
    id: 'weight',
    name: 'Weight',
    units: [
      { id: 'kg', name: 'Kilograms (kg)' },
      { id: 'g', name: 'Grams (g)' },
      { id: 'mg', name: 'Milligrams (mg)' },
      { id: 'lb', name: 'Pounds (lb)' },
      { id: 'oz', name: 'Ounces (oz)' },
      { id: 't', name: 'Metric Tons (t)' },
    ]
  },
  {
    id: 'volume',
    name: 'Volume',
    units: [
      { id: 'l', name: 'Liters (l)' },
      { id: 'ml', name: 'Milliliters (ml)' },
      { id: 'gal', name: 'Gallons (gal)' },
      { id: 'qt', name: 'Quarts (qt)' },
      { id: 'pt', name: 'Pints (pt)' },
      { id: 'c', name: 'Cups (c)' },
      { id: 'floz', name: 'Fluid Ounces (fl oz)' },
      { id: 'tbsp', name: 'Tablespoons (tbsp)' },
      { id: 'tsp', name: 'Teaspoons (tsp)' },
    ]
  },
  {
    id: 'temperature',
    name: 'Temperature',
    units: [
      { id: 'c', name: 'Celsius (°C)' },
      { id: 'f', name: 'Fahrenheit (°F)' },
      { id: 'k', name: 'Kelvin (K)' },
    ]
  },
  {
    id: 'area',
    name: 'Area',
    units: [
      { id: 'sqkm', name: 'Square Kilometers (km²)' },
      { id: 'sqm', name: 'Square Meters (m²)' },
      { id: 'sqmi', name: 'Square Miles (mi²)' },
      { id: 'sqyd', name: 'Square Yards (yd²)' },
      { id: 'sqft', name: 'Square Feet (ft²)' },
      { id: 'sqin', name: 'Square Inches (in²)' },
      { id: 'ha', name: 'Hectares (ha)' },
      { id: 'acre', name: 'Acres (acre)' },
    ]
  },
  {
    id: 'speed',
    name: 'Speed',
    units: [
      { id: 'mps', name: 'Meters per Second (m/s)' },
      { id: 'kph', name: 'Kilometers per Hour (km/h)' },
      { id: 'mph', name: 'Miles per Hour (mph)' },
      { id: 'kn', name: 'Knots (kn)' },
      { id: 'fts', name: 'Feet per Second (ft/s)' },
    ]
  },
];

// Conversion factors - all relative to the first unit in each category
const conversionFactors: { [key: string]: { [key: string]: number } } = {
  length: {
    km: 1,
    m: 1000,
    cm: 100000,
    mm: 1000000,
    mi: 0.621371,
    yd: 1093.61,
    ft: 3280.84,
    in: 39370.1,
  },
  weight: {
    kg: 1,
    g: 1000,
    mg: 1000000,
    lb: 2.20462,
    oz: 35.274,
    t: 0.001,
  },
  volume: {
    l: 1,
    ml: 1000,
    gal: 0.264172,
    qt: 1.05669,
    pt: 2.11338,
    c: 4.22675,
    floz: 33.814,
    tbsp: 67.628,
    tsp: 202.884,
  },
  area: {
    sqkm: 1,
    sqm: 1000000,
    sqmi: 0.386102,
    sqyd: 1195990,
    sqft: 10763900,
    sqin: 1550000000,
    ha: 100,
    acre: 247.105,
  },
  speed: {
    mps: 1,
    kph: 3.6,
    mph: 2.23694,
    kn: 1.94384,
    fts: 3.28084,
  },
};

// Special case for temperature which requires formulas
const convertTemperature = (value: number, from: string, to: string): number => {
  let kelvin: number;
  
  // Convert to Kelvin first
  switch (from) {
    case 'c':
      kelvin = value + 273.15;
      break;
    case 'f':
      kelvin = (value - 32) * 5/9 + 273.15;
      break;
    case 'k':
      kelvin = value;
      break;
    default:
      return 0;
  }
  
  // Convert from Kelvin to target
  switch (to) {
    case 'c':
      return kelvin - 273.15;
    case 'f':
      return (kelvin - 273.15) * 9/5 + 32;
    case 'k':
      return kelvin;
    default:
      return 0;
  }
};

const UnitConverter = () => {
  const [conversionType, setConversionType] = useState<string>('length');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('1');
  const [outputValue, setOutputValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Get current conversion type object
  const currentConversionType = conversionTypes.find(type => type.id === conversionType);

  // Set default units when conversion type changes
  React.useEffect(() => {
    if (currentConversionType && currentConversionType.units.length > 0) {
      setFromUnit(currentConversionType.units[0].id);
      setToUnit(currentConversionType.units.length > 1 ? currentConversionType.units[1].id : currentConversionType.units[0].id);
    }
  }, [conversionType, currentConversionType]);

  // Perform conversion when any input changes
  React.useEffect(() => {
    if (fromUnit && toUnit && inputValue) {
      try {
        const value = parseFloat(inputValue);
        
        if (isNaN(value)) {
          setError("Please enter a valid number");
          setOutputValue('');
          return;
        }
        
        setError('');
        
        // Special case for temperature
        if (conversionType === 'temperature') {
          const result = convertTemperature(value, fromUnit, toUnit);
          setOutputValue(result.toFixed(2));
          return;
        }
        
        // Regular conversion using factors
        if (conversionFactors[conversionType]) {
          const fromFactor = conversionFactors[conversionType][fromUnit];
          const toFactor = conversionFactors[conversionType][toUnit];
          
          if (fromFactor && toFactor) {
            // Convert to base unit then to target unit
            const result = (value / fromFactor) * toFactor;
            setOutputValue(result.toFixed(4).replace(/\.?0+$/, ''));
          }
        }
      } catch (e) {
        setError("Conversion error");
        setOutputValue('');
      }
    }
  }, [conversionType, fromUnit, toUnit, inputValue]);

  return (
    <>
      <Helmet>
        <title>Unit Converter - Convert Between Different Measurement Units | MyToolbox</title>
        <meta name="description" content="Convert between different units of measurement with our free online unit converter. Handles length, weight, volume, temperature, area, speed and more." />
        <meta name="keywords" content="unit converter, measurement converter, length converter, weight converter, temperature converter, metric to imperial, conversion tool" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 py-8 px-4 md:py-12">
          <div className="max-w-3xl mx-auto">
            <BackButton />
            
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                Unit Converter
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Convert between different units of measurement with our free online unit converter.
                Length, weight, volume, temperature, area, speed and more.
              </p>
            </div>
            
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Convert Units</CardTitle>
                <CardDescription>Select conversion type and units</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-4">
                  {/* Conversion Type Selector */}
                  <div>
                    <Label htmlFor="conversionType">Conversion Type</Label>
                    <Select 
                      value={conversionType} 
                      onValueChange={setConversionType}
                    >
                      <SelectTrigger id="conversionType" className="mt-1">
                        <SelectValue placeholder="Select conversion type" />
                      </SelectTrigger>
                      <SelectContent>
                        {conversionTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* From Unit */}
                    <div className="space-y-2">
                      <Label htmlFor="fromValue">From</Label>
                      <Input
                        id="fromValue"
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="mb-2"
                      />
                      <Select 
                        value={fromUnit} 
                        onValueChange={setFromUnit}
                        disabled={!currentConversionType}
                      >
                        <SelectTrigger id="fromUnit">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {currentConversionType?.units.map((unit) => (
                            <SelectItem key={unit.id} value={unit.id}>
                              {unit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* To Unit */}
                    <div className="space-y-2 relative">
                      <div className="absolute left-0 top-8 md:left-[-20px] md:top-14 flex justify-center">
                        <div className="hidden md:flex h-8 w-8 rounded-full bg-muted items-center justify-center">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                      
                      <Label htmlFor="toValue">To</Label>
                      <Input
                        id="toValue"
                        type="text"
                        value={outputValue}
                        readOnly
                        className="mb-2 bg-muted/50"
                      />
                      <Select 
                        value={toUnit} 
                        onValueChange={setToUnit}
                        disabled={!currentConversionType}
                      >
                        <SelectTrigger id="toUnit">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {currentConversionType?.units.map((unit) => (
                            <SelectItem key={unit.id} value={unit.id}>
                              {unit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 text-xs text-muted-foreground">
                  <p>
                    Note: Conversion results are rounded to four decimal places.
                    For high-precision scientific calculations, please use specialized tools.
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

export default UnitConverter;
