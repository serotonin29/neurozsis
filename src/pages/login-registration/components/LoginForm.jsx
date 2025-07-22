import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for testing
  const mockCredentials = {
    email: 'mahasiswa@fkunp.ac.id',
    password: 'NeuroZsis2025'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Success - redirect to dashboard
        navigate('/student-dashboard');
      } else {
        setErrors({
          general: `Email atau password salah. Gunakan: ${mockCredentials.email} / ${mockCredentials.password}`
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      navigate('/student-dashboard');
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
          <p className="font-body text-sm text-error">{errors.general}</p>
        </div>
      )}

      <Input
        label="Email Mahasiswa"
        type="email"
        name="email"
        placeholder="contoh@fkunp.ac.id"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        required
        disabled={isLoading}
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Masukkan password Anda"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-clinical"
          disabled={isLoading}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <Checkbox
          label="Ingat saya"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button
          type="button"
          className="font-body text-sm text-primary hover:text-primary/80 transition-clinical"
          disabled={isLoading}
        >
          Lupa password?
        </button>
      </div>

      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="mt-6"
      >
        {isLoading ? 'Masuk...' : 'Masuk'}
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground font-body">atau</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        fullWidth
        onClick={handleGoogleLogin}
        disabled={isLoading}
        iconName="Chrome"
        iconPosition="left"
        className="border-2"
      >
        Masuk dengan Google
      </Button>
    </form>
  );
};

export default LoginForm;