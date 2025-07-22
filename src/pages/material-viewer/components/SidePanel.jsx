import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const SidePanel = ({ 
  isOpen, 
  onClose, 
  material, 
  notes, 
  onNoteAdd, 
  onNoteEdit, 
  onNoteDelete,
  relatedMaterials,
  discussions 
}) => {
  const [activeTab, setActiveTab] = useState('notes');
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  const tabs = [
    { id: 'notes', label: 'Catatan', icon: 'StickyNote' },
    { id: 'related', label: 'Terkait', icon: 'BookOpen' },
    { id: 'discussion', label: 'Diskusi', icon: 'MessageSquare' }
  ];

  const handleAddNote = () => {
    if (newNote.trim()) {
      onNoteAdd({
        id: Date.now(),
        content: newNote,
        timestamp: new Date(),
        materialId: material.id,
        page: material.type === 'pdf' ? 1 : null,
        timeCode: material.type === 'video' ? 0 : null
      });
      setNewNote('');
    }
  };

  const handleEditNote = (noteId, content) => {
    onNoteEdit(noteId, content);
    setEditingNote(null);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const renderNotesTab = () => (
    <div className="space-y-4">
      {/* Add New Note */}
      <div className="bg-muted rounded-lg p-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Tulis catatan baru..."
          className="w-full h-24 p-3 bg-background border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary font-body text-sm"
        />
        <div className="flex justify-end mt-2">
          <Button
            variant="default"
            size="sm"
            onClick={handleAddNote}
            disabled={!newNote.trim()}
          >
            <Icon name="Plus" size={16} className="mr-1" />
            Tambah Catatan
          </Button>
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="bg-card border border-border rounded-lg p-4">
              {editingNote === note.id ? (
                <div>
                  <textarea
                    defaultValue={note.content}
                    className="w-full h-20 p-2 bg-background border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary font-body text-sm"
                    onBlur={(e) => handleEditNote(note.id, e.target.value)}
                    autoFocus
                  />
                </div>
              ) : (
                <div>
                  <p className="font-body text-sm text-foreground mb-2">{note.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Icon name="Clock" size={12} />
                      <span className="font-caption">{formatDate(note.timestamp)}</span>
                      {note.page && (
                        <>
                          <span>•</span>
                          <span className="font-caption">Hal. {note.page}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingNote(note.id)}
                        className="w-6 h-6"
                      >
                        <Icon name="Edit2" size={12} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onNoteDelete(note.id)}
                        className="w-6 h-6 text-error hover:text-error"
                      >
                        <Icon name="Trash2" size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="StickyNote" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="font-body text-sm text-muted-foreground">Belum ada catatan</p>
            <p className="font-caption text-xs text-muted-foreground">Tambahkan catatan pertama Anda</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderRelatedTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-sm text-foreground">Materi Terkait</h3>
        <Button variant="ghost" size="sm">
          <Icon name="RefreshCw" size={16} />
        </Button>
      </div>

      <div className="space-y-3">
        {relatedMaterials.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-clinical transition-clinical cursor-pointer">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon 
                  name={item.type === 'pdf' ? 'FileText' : item.type === 'video' ? 'Play' : 'Image'} 
                  size={20} 
                  className="text-muted-foreground" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-body font-medium text-sm text-foreground truncate">{item.title}</h4>
                <p className="font-caption text-xs text-muted-foreground mt-1">{item.category}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} className="text-muted-foreground" />
                    <span className="font-caption text-xs text-muted-foreground">{item.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="BarChart3" size={12} className="text-muted-foreground" />
                    <span className="font-caption text-xs text-muted-foreground">{item.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        <Icon name="Plus" size={16} className="mr-2" />
        Lihat Lebih Banyak
      </Button>
    </div>
  );

  const renderDiscussionTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-sm text-foreground">Diskusi Materi</h3>
        <Button variant="ghost" size="sm">
          <Icon name="Plus" size={16} />
        </Button>
      </div>

      <div className="space-y-3">
        {discussions.map((discussion) => (
          <div key={discussion.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-heading font-medium text-xs">
                  {discussion.author.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-body font-medium text-sm text-foreground">{discussion.author}</span>
                  <span className="font-caption text-xs text-muted-foreground">{discussion.time}</span>
                </div>
                <p className="font-body text-sm text-foreground mb-2">{discussion.content}</p>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-clinical">
                    <Icon name="Heart" size={12} />
                    <span className="font-caption text-xs">{discussion.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-clinical">
                    <Icon name="MessageCircle" size={12} />
                    <span className="font-caption text-xs">{discussion.replies}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        <Icon name="MessageSquare" size={16} className="mr-2" />
        Buka Forum Diskusi
      </Button>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-1040"
          onClick={onClose}
        />
      )}

      {/* Side Panel */}
      <div className={`
        fixed lg:relative top-0 right-0 h-full w-80 bg-card border-l border-border shadow-clinical-lg z-1050 transform transition-clinical
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        ${isOpen ? 'lg:block' : 'lg:block'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-heading font-semibold text-foreground">Panel Samping</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-2 transition-clinical ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span className="font-body text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'notes' && renderNotesTab()}
            {activeTab === 'related' && renderRelatedTab()}
            {activeTab === 'discussion' && renderDiscussionTab()}
          </div>
        </div>
      </div>
    </>
  );
};

export default SidePanel;