
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Lock, 
  Copy, 
  RefreshCw, 
  Eye, 
  EyeOff,
  Shield,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Save,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

interface SavedPassword {
  id: string;
  password: string;
  label: string;
  createdAt: number;
  strength: number;
}

const strengthLabels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500'];

const PasswordGenerator = () => {
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordLabel, setPasswordLabel] = useState<string>('');
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true
  });
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [savedPasswords, setSavedPasswords] = useState<SavedPassword[]>([]);
  
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load saved passwords from localStorage
    const saved = localStorage.getItem('savedPasswords');
    if (saved) {
      try {
        setSavedPasswords(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved passwords');
      }
    }
    
    // Generate initial password
    generatePassword();
  }, []);

  useEffect(() => {
    if (password) {
      calculatePasswordStrength();
    }
  }, [password]);

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // Create character pool based on options
    let charPool = '';
    if (options.includeUppercase) charPool += uppercaseChars;
    if (options.includeLowercase) charPool += lowercaseChars;
    if (options.includeNumbers) charPool += numberChars;
    if (options.includeSymbols) charPool += symbolChars;
    
    // Ensure at least one option is selected
    if (charPool.length === 0) {
      setOptions(prev => ({ ...prev, includeLowercase: true }));
      charPool = lowercaseChars;
    }
    
    // Generate password
    let newPassword = '';
    for (let i = 0; i < options.length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      newPassword += charPool[randomIndex];
    }
    
    setPassword(newPassword);
  };

  const calculatePasswordStrength = () => {
    // Simple password strength calculation
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    // Adjust to 0-4 scale
    strength = Math.min(4, Math.floor(strength / 1.5));
    
    setPasswordStrength(strength);
  };

  const copyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      navigator.clipboard.writeText(password);
      toast.success('Password copied to clipboard!');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const savePassword = () => {
    if (!password) return;
    
    const label = passwordLabel.trim() || `Password ${savedPasswords.length + 1}`;
    
    const newPassword: SavedPassword = {
      id: Date.now().toString(),
      password,
      label,
      createdAt: Date.now(),
      strength: passwordStrength
    };
    
    const updatedPasswords = [...savedPasswords, newPassword];
    setSavedPasswords(updatedPasswords);
    localStorage.setItem('savedPasswords', JSON.stringify(updatedPasswords));
    
    setPasswordLabel('');
    toast.success('Password saved!');
  };

  const deletePassword = (id: string) => {
    const updatedPasswords = savedPasswords.filter(pwd => pwd.id !== id);
    setSavedPasswords(updatedPasswords);
    localStorage.setItem('savedPasswords', JSON.stringify(updatedPasswords));
    toast.success('Password removed');
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <>
      <Helmet>
        <title>Password Generator | Create Strong Secure Passwords | EveryTools</title>
        <meta name="description" content="Generate strong, secure passwords with this free online tool. Customize length and character types. Free to use, no registration required." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link to="/" className="inline-flex items-center mr-4">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Password Generator</h1>
              <p className="text-muted-foreground">Create strong, secure passwords instantly</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Password Generator Section */}
            <div className="glass-card p-6 rounded-xl">
              <div className="mb-4 w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Lock className="h-8 w-8 text-blue-400" />
              </div>
              
              <h2 className="text-xl font-semibold mb-6">Generate Password</h2>
              
              <div className="space-y-6">
                {/* Password Display */}
                <div>
                  <Label htmlFor="password" className="sr-only">Generated Password</Label>
                  <div className="relative">
                    <Input
                      ref={passwordRef}
                      id="password"
                      type={passwordVisible ? 'text' : 'password'}
                      value={password}
                      readOnly
                      className="pr-20 font-mono text-lg h-12"
                    />
                    <div className="absolute inset-y-0 right-0 flex">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-full"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-full"
                        onClick={copyToClipboard}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Password Strength Indicator */}
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Password Strength</p>
                    <p className="text-sm font-medium">{strengthLabels[passwordStrength]}</p>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full transition-all", strengthColors[passwordStrength])}
                      style={{ width: `${(passwordStrength + 1) * 20}%` }}
                    />
                  </div>
                </div>
                
                {/* Password Length */}
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="password-length">Length: {options.length} characters</Label>
                  </div>
                  <Slider
                    id="password-length"
                    min={4}
                    max={64}
                    step={1}
                    value={[options.length]}
                    onValueChange={(value) => setOptions(prev => ({ ...prev, length: value[0] }))}
                  />
                </div>
                
                {/* Character Type Options */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Include Characters</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="uppercase"
                        checked={options.includeUppercase}
                        onCheckedChange={(checked) => 
                          setOptions(prev => ({ ...prev, includeUppercase: checked }))
                        }
                      />
                      <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
                    </div>
                    {options.includeUppercase ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="lowercase"
                        checked={options.includeLowercase}
                        onCheckedChange={(checked) => 
                          setOptions(prev => ({ ...prev, includeLowercase: checked }))
                        }
                      />
                      <Label htmlFor="lowercase">Lowercase (a-z)</Label>
                    </div>
                    {options.includeLowercase ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="numbers"
                        checked={options.includeNumbers}
                        onCheckedChange={(checked) => 
                          setOptions(prev => ({ ...prev, includeNumbers: checked }))
                        }
                      />
                      <Label htmlFor="numbers">Numbers (0-9)</Label>
                    </div>
                    {options.includeNumbers ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="symbols"
                        checked={options.includeSymbols}
                        onCheckedChange={(checked) => 
                          setOptions(prev => ({ ...prev, includeSymbols: checked }))
                        }
                      />
                      <Label htmlFor="symbols">Symbols (!@#$%^&*)</Label>
                    </div>
                    {options.includeSymbols ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
                
                {/* Generate Button */}
                <Button 
                  onClick={generatePassword}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate New Password
                </Button>
                
                {/* Save Password */}
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-2">Save Password</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Label (e.g., Gmail, Netflix)"
                      value={passwordLabel}
                      onChange={(e) => setPasswordLabel(e.target.value)}
                    />
                    <Button onClick={savePassword}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Password Security & Saved Section */}
            <div className="glass-card p-6 rounded-xl">
              <div className="mb-4 w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-400" />
              </div>
              
              <h2 className="text-xl font-semibold mb-6">Password Security</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3">Security Tips</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Use a different password for each account</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Longer passwords (12+ characters) are more secure</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Mix uppercase, lowercase, numbers, and symbols</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Consider using a password manager to store your passwords</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Enable two-factor authentication when available</span>
                  </li>
                </ul>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-3">Saved Passwords</h3>
                
                {savedPasswords.length === 0 ? (
                  <div className="text-center py-8 border border-dashed rounded-lg">
                    <Lock className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Your saved passwords will appear here.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Passwords are stored locally on your device only.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedPasswords.map((saved) => (
                      <div 
                        key={saved.id} 
                        className="border rounded-lg p-3 shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{saved.label}</h4>
                            <p className="text-xs text-muted-foreground">
                              Created: {formatDate(saved.createdAt)}
                            </p>
                          </div>
                          <div className="flex">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              onClick={() => {
                                navigator.clipboard.writeText(saved.password);
                                toast.success('Password copied to clipboard!');
                              }}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-red-500" 
                              onClick={() => deletePassword(saved.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Input
                            type="password"
                            value="●●●●●●●●●●●●●●●●"
                            disabled
                            className="h-8 text-xs font-mono"
                          />
                          <div className={cn("ml-2 w-2 h-8", strengthColors[saved.strength])} />
                        </div>
                      </div>
                    ))}
                    
                    {savedPasswords.length > 0 && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setSavedPasswords([]);
                          localStorage.removeItem('savedPasswords');
                          toast.success('All saved passwords cleared');
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear All Saved Passwords
                      </Button>
                    )}
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground mt-4">
                  <strong>Privacy Note:</strong> Passwords are stored in your browser's local storage and never sent to our servers.
                </p>
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto mt-12 glass-card p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">How to Use Password Generator</h2>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>Adjust the password length using the slider (longer passwords are more secure).</li>
              <li>Select which types of characters to include in your password.</li>
              <li>Click "Generate New Password" to create a random password.</li>
              <li>Use the eye icon to show/hide the password.</li>
              <li>Copy the password to clipboard with the copy icon.</li>
              <li>Optionally, save passwords with custom labels for future reference.</li>
            </ol>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PasswordGenerator;
