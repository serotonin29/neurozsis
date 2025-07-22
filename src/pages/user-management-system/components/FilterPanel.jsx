import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ activeTab, filters, onFiltersChange }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      status: '',
      program: '',
      year: '',
      activity: '',
      role: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  // Filter options based on user type
  const getFilterOptions = () => {
    const commonFilters = {
      status: [
        { value: 'active', label: 'Aktif' },
        { value: 'inactive', label: 'Tidak Aktif' },
        { value: 'suspended', label: 'Ditangguhkan' }
      ],
      activity: [
        { value: 'online', label: 'Sedang Online' },
        { value: 'today', label: 'Aktif Hari Ini' },
        { value: 'week', label: 'Aktif Minggu Ini' },
        { value: 'month', label: 'Aktif Bulan Ini' },
        { value: 'inactive', label: 'Tidak Aktif > 30 Hari' }
      ]
    };

    if (activeTab === 'students') {
      return {
        ...commonFilters,
        program: [
          { value: 'kedokteran', label: 'Kedokteran' },
          { value: 'kedokteran_gigi', label: 'Kedokteran Gigi' },
          { value: 'farmasi', label: 'Farmasi' },
          { value: 'keperawatan', label: 'Keperawatan' }
        ],
        year: [
          { value: '2025', label: '2025' },
          { value: '2024', label: '2024' },
          { value: '2023', label: '2023' },
          { value: '2022', label: '2022' },
          { value: '2021', label: '2021' },
          { value: '2020', label: '2020' }
        ]
      };
    }

    if (activeTab === 'faculty') {
      return {
        ...commonFilters,
        program: [
          { value: 'neurologi', label: 'Neurologi' },
          { value: 'kardiologi', label: 'Kardiologi' },
          { value: 'pediatri', label: 'Pediatri' },
          { value: 'bedah', label: 'Bedah' },
          { value: 'internal', label: 'Penyakit Dalam' },
          { value: 'radiologi', label: 'Radiologi' }
        ],
        department: [
          { value: 'fakultas_kedokteran', label: 'Fakultas Kedokteran' },
          { value: 'fakultas_kedokteran_gigi', label: 'Fakultas Kedokteran Gigi' },
          { value: 'fakultas_farmasi', label: 'Fakultas Farmasi' }
        ]
      };
    }

    if (activeTab === 'administrators') {
      return {
        ...commonFilters,
        role: [
          { value: 'system_administrator', label: 'System Administrator' },
          { value: 'content_manager', label: 'Content Manager' },
          { value: 'user_manager', label: 'User Manager' },
          { value: 'moderator', label: 'Forum Moderator' }
        ],
        permissions: [
          { value: 'user_management', label: 'Manajemen Pengguna' },
          { value: 'content_management', label: 'Manajemen Konten' },
          { value: 'system_admin', label: 'Administrasi Sistem' },
          { value: 'forum_moderation', label: 'Moderasi Forum' }
        ]
      };
    }

    return commonFilters;
  };

  const filterOptions = getFilterOptions();
  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <div className="bg-muted/30 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filter Pengguna</span>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
              {activeFiltersCount} aktif
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="xs"
            iconName="X"
            onClick={clearAllFilters}
          >
            Hapus Semua Filter
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* Status Filter - Common for all user types */}
        <Select
          label="Status"
          placeholder="Pilih status..."
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
          options={filterOptions.status}
          clearable
        />

        {/* Activity Filter - Common for all user types */}
        <Select
          label="Aktivitas"
          placeholder="Pilih aktivitas..."
          value={filters.activity}
          onChange={(value) => handleFilterChange('activity', value)}
          options={filterOptions.activity}
          clearable
        />

        {/* Conditional filters based on user type */}
        {activeTab === 'students' && (
          <>
            <Select
              label="Program Studi"
              placeholder="Pilih program..."
              value={filters.program}
              onChange={(value) => handleFilterChange('program', value)}
              options={filterOptions.program}
              clearable
            />
            <Select
              label="Angkatan"
              placeholder="Pilih angkatan..."
              value={filters.year}
              onChange={(value) => handleFilterChange('year', value)}
              options={filterOptions.year}
              clearable
            />
          </>
        )}

        {activeTab === 'faculty' && (
          <>
            <Select
              label="Spesialisasi"
              placeholder="Pilih spesialisasi..."
              value={filters.program}
              onChange={(value) => handleFilterChange('program', value)}
              options={filterOptions.program}
              clearable
            />
            <Select
              label="Fakultas"
              placeholder="Pilih fakultas..."
              value={filters.department}
              onChange={(value) => handleFilterChange('department', value)}
              options={filterOptions.department}
              clearable
            />
          </>
        )}

        {activeTab === 'administrators' && (
          <>
            <Select
              label="Peran"
              placeholder="Pilih peran..."
              value={filters.role}
              onChange={(value) => handleFilterChange('role', value)}
              options={filterOptions.role}
              clearable
            />
            <Select
              label="Hak Akses"
              placeholder="Pilih hak akses..."
              value={filters.permissions}
              onChange={(value) => handleFilterChange('permissions', value)}
              options={filterOptions.permissions}
              clearable
            />
          </>
        )}
      </div>

      {/* Advanced Filter Options */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span>Filter Lanjutan:</span>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-input" />
              <span>Hanya pengguna dengan foto profil</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-input" />
              <span>Akun yang belum diverifikasi</span>
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="xs" iconName="Save">
              Simpan Filter
            </Button>
            <Button variant="ghost" size="xs" iconName="Download">
              Export Hasil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;