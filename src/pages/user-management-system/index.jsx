import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';


// Components
import UserTable from './components/UserTable';
import UserProfilePanel from './components/UserProfilePanel';
import BulkActionsBar from './components/BulkActionsBar';
import ActivityMonitor from './components/ActivityMonitor';
import FilterPanel from './components/FilterPanel';

const UserManagementSystem = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    program: '',
    year: '',
    activity: '',
    role: ''
  });

  // Mock data - replace with real API calls
  const mockUsers = {
    students: [
      {
        id: 1,
        name: 'Ahmad Ridwan',
        email: 'ahmad.ridwan@student.univ.ac.id',
        avatar: null,
        status: 'active',
        program: 'Kedokteran',
        year: '2023',
        registrationDate: '2023-08-15',
        lastActivity: '2025-01-22T10:30:00',
        assessmentScore: 85,
        forumParticipation: 23,
        learningProgress: 67,
        onlineStatus: true
      },
      {
        id: 2,
        name: 'Siti Nurhaliza',
        email: 'siti.nurhaliza@student.univ.ac.id',
        avatar: null,
        status: 'active',
        program: 'Kedokteran',
        year: '2022',
        registrationDate: '2022-08-20',
        lastActivity: '2025-01-22T09:15:00',
        assessmentScore: 92,
        forumParticipation: 45,
        learningProgress: 89,
        onlineStatus: false
      }
    ],
    faculty: [
      {
        id: 3,
        name: 'Prof. Dr. Bambang Suryadi',
        email: 'bambang.suryadi@faculty.univ.ac.id',
        avatar: null,
        status: 'active',
        program: 'Neurologi',
        department: 'Fakultas Kedokteran',
        registrationDate: '2020-01-15',
        lastActivity: '2025-01-22T11:45:00',
        coursesTeaching: 5,
        studentsSupervised: 42,
        onlineStatus: true
      }
    ],
    administrators: [
      {
        id: 4,
        name: 'Dr. Sarah Wijaya',
        email: 'sarah.wijaya@admin.univ.ac.id',
        avatar: null,
        status: 'active',
        role: 'System Administrator',
        permissions: ['user_management', 'content_management', 'system_admin'],
        registrationDate: '2019-06-01',
        lastActivity: '2025-01-22T11:50:00',
        onlineStatus: true
      }
    ]
  };

  const tabs = [
    { id: 'students', label: 'Mahasiswa', icon: 'Users', count: mockUsers.students.length },
    { id: 'faculty', label: 'Dosen', icon: 'UserCheck', count: mockUsers.faculty.length },
    { id: 'administrators', label: 'Administrator', icon: 'Shield', count: mockUsers.administrators.length }
  ];

  const currentUsers = mockUsers[activeTab] || [];

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    let result = currentUsers;

    // Search filter
    if (searchQuery) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Additional filters
    if (filters.status && filters.status !== '') {
      result = result.filter(user => user.status === filters.status);
    }

    if (filters.program && filters.program !== '') {
      result = result.filter(user => user.program === filters.program);
    }

    if (filters.year && filters.year !== '') {
      result = result.filter(user => user.year === filters.year);
    }

    return result;
  }, [currentUsers, searchQuery, filters]);

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'for users:', selectedUsers);
    // Implement bulk action logic
    setSelectedUsers([]);
  };

  const handleExport = () => {
    console.log('Exporting users...');
    // Implement export logic
  };

  const onlineUsersCount = currentUsers.filter(user => user.onlineStatus).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Link to="/admin-dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="ArrowLeft" size={20} />
                </Link>
                <div>
                  <h1 className="text-2xl font-heading font-bold text-foreground">
                    Manajemen Pengguna
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Kelola akun mahasiswa, dosen, dan administrator
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Download"
                onClick={handleExport}
                size="sm"
              >
                Export
              </Button>
              <ActivityMonitor onlineCount={onlineUsersCount} totalCount={currentUsers.length} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="flex space-x-1 mb-4 lg:mb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedUsers([]);
                  setSearchQuery('');
                  setFilters({ status: '', program: '', year: '', activity: '', role: '' });
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={`Cari ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              iconName="Filter"
              onClick={() => setShowFilters(!showFilters)}
              size="sm"
              className={showFilters ? 'bg-muted' : ''}
            >
              Filter
            </Button>
            <Button
              variant="outline"
              iconName="RotateCcw"
              onClick={() => {
                setFilters({ status: '', program: '', year: '', activity: '', role: '' });
                setSearchQuery('');
              }}
              size="sm"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <FilterPanel
            activeTab={activeTab}
            filters={filters}
            onFiltersChange={setFilters}
          />
        )}

        {/* Bulk Actions Bar */}
        {selectedUsers.length > 0 && (
          <BulkActionsBar
            selectedCount={selectedUsers.length}
            onBulkAction={handleBulkAction}
            onClearSelection={() => setSelectedUsers([])}
          />
        )}

        {/* Users Table */}
        <div className="bg-card rounded-xl border border-border shadow-sm">
          <UserTable
            users={filteredUsers}
            activeTab={activeTab}
            selectedUsers={selectedUsers}
            onSelectedUsersChange={setSelectedUsers}
            onUserProfileOpen={setSelectedUserProfile}
            searchQuery={searchQuery}
          />
        </div>
      </div>

      {/* User Profile Panel */}
      {selectedUserProfile && (
        <UserProfilePanel
          user={selectedUserProfile}
          userType={activeTab}
          onClose={() => setSelectedUserProfile(null)}
        />
      )}
    </div>
  );
};

export default UserManagementSystem;