import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const bulkActions = [
    { value: 'activate', label: 'Aktifkan Akun', icon: 'UserCheck', variant: 'success' },
    { value: 'deactivate', label: 'Nonaktifkan Akun', icon: 'UserX', variant: 'warning' },
    { value: 'suspend', label: 'Tangguhkan Akun', icon: 'UserMinus', variant: 'destructive' },
    { value: 'reset_password', label: 'Reset Password', icon: 'Key', variant: 'outline' },
    { value: 'send_email', label: 'Kirim Email', icon: 'Mail', variant: 'outline' },
    { value: 'export', label: 'Export Data', icon: 'Download', variant: 'outline' },
    { value: 'delete', label: 'Hapus Pengguna', icon: 'Trash2', variant: 'destructive' }
  ];

  const handleBulkActionSelect = (action) => {
    const actionData = bulkActions.find(a => a.value === action);
    if (actionData && ['suspend', 'deactivate', 'delete', 'reset_password'].includes(action)) {
      setPendingAction(actionData);
      setShowConfirmation(true);
    } else {
      onBulkAction(action);
    }
  };

  const handleConfirmAction = () => {
    if (pendingAction) {
      onBulkAction(pendingAction.value);
      setShowConfirmation(false);
      setPendingAction(null);
    }
  };

  const getActionDescription = (action) => {
    const descriptions = {
      activate: 'mengaktifkan',
      deactivate: 'menonaktifkan',
      suspend: 'menangguhkan',
      delete: 'menghapus',
      reset_password: 'mereset password'
    };
    return descriptions[action] || action;
  };

  return (
    <>
      {/* Bulk Actions Bar */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Check" size={16} className="text-primary-foreground" />
              </div>
              <span className="font-medium text-foreground">
                {selectedCount} pengguna dipilih
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClearSelection}
              className="text-muted-foreground hover:text-foreground"
            >
              Batal Pilih
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <Select
              placeholder="Pilih aksi..."
              options={bulkActions.map(action => ({
                value: action.value,
                label: action.label
              }))}
              onChange={handleBulkActionSelect}
              className="min-w-48"
            />
            
            <div className="flex items-center space-x-2">
              {bulkActions.slice(0, 3).map((action) => (
                <Button
                  key={action.value}
                  variant={action.variant}
                  size="sm"
                  iconName={action.icon}
                  onClick={() => handleBulkActionSelect(action.value)}
                  className="hidden lg:flex"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && pendingAction && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                pendingAction.variant === 'destructive' ?'bg-error/10 text-error' :'bg-warning/10 text-warning'
              }`}>
                <Icon name={pendingAction.icon} size={20} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Konfirmasi Aksi
                </h3>
                <p className="text-sm text-muted-foreground">
                  Aksi ini tidak dapat dibatalkan
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-foreground">
                Apakah Anda yakin ingin <strong>{getActionDescription(pendingAction.value)}</strong> {selectedCount} pengguna yang dipilih?
              </p>
              {pendingAction.value === 'delete' && (
                <div className="mt-3 p-3 bg-error/5 border border-error/20 rounded-lg">
                  <p className="text-sm text-error font-medium">
                    ⚠️ Peringatan: Pengguna yang dihapus tidak dapat dipulihkan
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowConfirmation(false);
                  setPendingAction(null);
                }}
              >
                Batal
              </Button>
              <Button
                variant={pendingAction.variant}
                onClick={handleConfirmAction}
                iconName={pendingAction.icon}
              >
                {pendingAction.label}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActionsBar;