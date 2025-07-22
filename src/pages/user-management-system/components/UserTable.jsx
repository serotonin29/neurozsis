import React, { useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const UserTable = ({ 
  users, 
  activeTab, 
  selectedUsers, 
  onSelectedUsersChange, 
  onUserProfileOpen,
  searchQuery 
}) => {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      onSelectedUsersChange(selectedUsers.filter(id => id !== userId));
    } else {
      onSelectedUsersChange([...selectedUsers, userId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      onSelectedUsersChange([]);
    } else {
      onSelectedUsersChange(users.map(user => user.id));
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'inactive':
        return 'bg-muted text-muted-foreground border-border';
      case 'suspended':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'inactive': return 'Tidak Aktif';
      case 'suspended': return 'Ditangguhkan';
      default: return status;
    }
  };

  const formatLastActivity = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Baru saja';
    if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} jam lalu`;
    return format(date, 'dd MMM yyyy', { locale: id });
  };

  const renderTableHeader = () => {
    const headers = {
      students: [
        { key: 'select', label: '', sortable: false },
        { key: 'name', label: 'Nama', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'program', label: 'Program', sortable: true },
        { key: 'year', label: 'Angkatan', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'lastActivity', label: 'Aktivitas Terakhir', sortable: true },
        { key: 'learningProgress', label: 'Progress', sortable: true },
        { key: 'actions', label: 'Aksi', sortable: false }
      ],
      faculty: [
        { key: 'select', label: '', sortable: false },
        { key: 'name', label: 'Nama', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'program', label: 'Spesialisasi', sortable: true },
        { key: 'department', label: 'Fakultas', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'lastActivity', label: 'Aktivitas Terakhir', sortable: true },
        { key: 'studentsSupervised', label: 'Mahasiswa Bimbingan', sortable: true },
        { key: 'actions', label: 'Aksi', sortable: false }
      ],
      administrators: [
        { key: 'select', label: '', sortable: false },
        { key: 'name', label: 'Nama', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'role', label: 'Peran', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'lastActivity', label: 'Aktivitas Terakhir', sortable: true },
        { key: 'actions', label: 'Aksi', sortable: false }
      ]
    };

    return headers[activeTab] || headers.students;
  };

  const renderTableRow = (user) => {
    const isSelected = selectedUsers.includes(user.id);

    if (activeTab === 'students') {
      return (
        <tr key={user.id} className={cn("border-b border-border hover:bg-muted/50 transition-colors", isSelected && "bg-primary/5")}>
          <td className="px-6 py-4">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleSelectUser(user.id)}
              className="rounded border-input"
            />
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-medium text-foreground">{user.name}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <div className={cn("w-2 h-2 rounded-full", user.onlineStatus ? "bg-success" : "bg-muted")} />
                  <span>{user.onlineStatus ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
          <td className="px-6 py-4 text-sm text-foreground">{user.program}</td>
          <td className="px-6 py-4 text-sm text-foreground">{user.year}</td>
          <td className="px-6 py-4">
            <span className={cn("px-2 py-1 rounded-full text-xs font-medium border", getStatusColor(user.status))}>
              {getStatusLabel(user.status)}
            </span>
          </td>
          <td className="px-6 py-4 text-sm text-muted-foreground">
            {formatLastActivity(user.lastActivity)}
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-muted rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2 transition-all"
                  style={{ width: `${user.learningProgress}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{user.learningProgress}%</span>
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Eye"
                onClick={() => onUserProfileOpen(user)}
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Edit"
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreVertical"
              />
            </div>
          </td>
        </tr>
      );
    }

    if (activeTab === 'faculty') {
      return (
        <tr key={user.id} className={cn("border-b border-border hover:bg-muted/50 transition-colors", isSelected && "bg-primary/5")}>
          <td className="px-6 py-4">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleSelectUser(user.id)}
              className="rounded border-input"
            />
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-accent-foreground">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-medium text-foreground">{user.name}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <div className={cn("w-2 h-2 rounded-full", user.onlineStatus ? "bg-success" : "bg-muted")} />
                  <span>{user.onlineStatus ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
          <td className="px-6 py-4 text-sm text-foreground">{user.program}</td>
          <td className="px-6 py-4 text-sm text-foreground">{user.department}</td>
          <td className="px-6 py-4">
            <span className={cn("px-2 py-1 rounded-full text-xs font-medium border", getStatusColor(user.status))}>
              {getStatusLabel(user.status)}
            </span>
          </td>
          <td className="px-6 py-4 text-sm text-muted-foreground">
            {formatLastActivity(user.lastActivity)}
          </td>
          <td className="px-6 py-4 text-sm text-foreground">
            {user.studentsSupervised} mahasiswa
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Eye"
                onClick={() => onUserProfileOpen(user)}
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Edit"
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreVertical"
              />
            </div>
          </td>
        </tr>
      );
    }

    if (activeTab === 'administrators') {
      return (
        <tr key={user.id} className={cn("border-b border-border hover:bg-muted/50 transition-colors", isSelected && "bg-primary/5")}>
          <td className="px-6 py-4">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleSelectUser(user.id)}
              className="rounded border-input"
            />
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-warning-foreground">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-medium text-foreground">{user.name}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <div className={cn("w-2 h-2 rounded-full", user.onlineStatus ? "bg-success" : "bg-muted")} />
                  <span>{user.onlineStatus ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
          <td className="px-6 py-4 text-sm text-foreground">{user.role}</td>
          <td className="px-6 py-4">
            <span className={cn("px-2 py-1 rounded-full text-xs font-medium border", getStatusColor(user.status))}>
              {getStatusLabel(user.status)}
            </span>
          </td>
          <td className="px-6 py-4 text-sm text-muted-foreground">
            {formatLastActivity(user.lastActivity)}
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Eye"
                onClick={() => onUserProfileOpen(user)}
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Edit"
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreVertical"
              />
            </div>
          </td>
        </tr>
      );
    }
  };

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          {searchQuery ? 'Tidak ada hasil pencarian' : 'Belum ada data pengguna'}
        </h3>
        <p className="text-muted-foreground">
          {searchQuery 
            ? `Tidak ditemukan pengguna yang cocok dengan "${searchQuery}"`
            : 'Data pengguna akan tampil di sini setelah ditambahkan'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-muted/20 border-b border-border">
          <tr>
            {renderTableHeader().map((header) => (
              <th key={header.key} className="px-6 py-3 text-left">
                {header.key === 'select' ? (
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === users.length && users.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-input"
                  />
                ) : header.sortable ? (
                  <button
                    onClick={() => handleSort(header.key)}
                    className="flex items-center space-x-1 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                  >
                    <span>{header.label}</span>
                    {sortBy === header.key && (
                      <Icon 
                        name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                        size={14} 
                      />
                    )}
                  </button>
                ) : (
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {header.label}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-card divide-y divide-border">
          {sortedUsers.map(renderTableRow)}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;