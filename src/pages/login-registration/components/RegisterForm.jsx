import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    programYear: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const programYearOptions = [
    { value: '2025', label: 'Angkatan 2025' },
    { value: '2024', label: 'Angkatan 2024' },
    { value: '2023', label: 'Angkatan 2023' },
    { value: '2022', label: 'Angkatan 2022' },
    { value: '2021', label: 'Angkatan 2021' },
    { value: '2020', label: 'Angkatan 2020' }
  ];

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

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, programYear: value }));
    if (errors.programYear) {
      setErrors(prev => ({ ...prev, programYear: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Student ID validation
    if (!formData.studentId) {
      newErrors.studentId = 'NIM wajib diisi';
    } else if (!/^\d{10}$/.test(formData.studentId)) {
      newErrors.studentId = 'NIM harus 10 digit angka';
    }
    
    // Full name validation
    if (!formData.fullName) {
      newErrors.fullName = 'Nama lengkap wajib diisi';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Nama lengkap minimal 3 karakter';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!formData.email.includes('@fkunp.ac.id')) {
      newErrors.email = 'Gunakan email institusi @fkunp.ac.id';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password harus mengandung huruf besar, kecil, dan angka';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    
    // Program year validation
    if (!formData.programYear) {
      newErrors.programYear = 'Angkatan wajib dipilih';
    }
    
    // Terms agreement validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Anda harus menyetujui syarat dan ketentuan';
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
      // Success - redirect to dashboard
      navigate('/student-dashboard');
      setIsLoading(false);
    }, 2000);
  };

  const handleGoogleRegister = () => {
    setIsLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      navigate('/student-dashboard');
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="NIM"
          type="text"
          name="studentId"
          placeholder="2025001234"
          value={formData.studentId}
          onChange={handleInputChange}
          error={errors.studentId}
          required
          disabled={isLoading}
          maxLength={10}
        />

        <Select
          label="Angkatan"
          options={programYearOptions}
          value={formData.programYear}
          onChange={handleSelectChange}
          error={errors.programYear}
          placeholder="Pilih angkatan"
          required
          disabled={isLoading}
        />
      </div>

      <Input
        label="Nama Lengkap"
        type="text"
        name="fullName"
        placeholder="Masukkan nama lengkap Anda"
        value={formData.fullName}
        onChange={handleInputChange}
        error={errors.fullName}
        required
        disabled={isLoading}
      />

      <Input
        label="Email Institusi"
        type="email"
        name="email"
        placeholder="nama.anda@fkunp.ac.id"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        description="Gunakan email institusi FK UNP"
        required
        disabled={isLoading}
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Minimal 8 karakter"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          description="Kombinasi huruf besar, kecil, dan angka"
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

      <div className="relative">
        <Input
          label="Konfirmasi Password"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Ulangi password Anda"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-clinical"
          disabled={isLoading}
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>

      <Checkbox
        label="Saya menyetujui syarat dan ketentuan serta kebijakan privasi"
        name="agreeTerms"
        checked={formData.agreeTerms}
        onChange={handleInputChange}
        error={errors.agreeTerms}
        required
        disabled={isLoading}
      />

      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="mt-6"
      >
        {isLoading ? 'Mendaftar...' : 'Daftar Sekarang'}
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
        onClick={handleGoogleRegister}
        disabled={isLoading}
        iconName="Chrome"
        iconPosition="left"
        className="border-2"
      >
        Daftar dengan Google
      </Button>
    </form>
  );
};

export default RegisterForm;