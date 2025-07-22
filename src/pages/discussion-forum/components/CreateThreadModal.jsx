import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateThreadModal = ({ isOpen, onClose, onSubmit, categories }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim() && formData.category) {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      onSubmit({
        ...formData,
        tags: tagsArray
      });
      
      setFormData({
        title: '',
        content: '',
        category: '',
        tags: ''
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  const categoryOptions = categories.map(cat => ({
    value: cat.id,
    label: cat.name,
    description: cat.description
  }));

  return (
    <div className="fixed inset-0 z-1050 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-card border border-border rounded-lg shadow-clinical-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-bold text-xl text-foreground">
            Buat Diskusi Baru
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <Input
            label="Judul Diskusi"
            type="text"
            placeholder="Masukkan judul diskusi yang jelas dan deskriptif"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
            description="Gunakan judul yang spesifik untuk memudahkan pencarian"
          />
          
          <Select
            label="Kategori"
            placeholder="Pilih kategori diskusi"
            options={categoryOptions}
            value={formData.category}
            onChange={(value) => handleInputChange('category', value)}
            required
            description="Pilih kategori yang paling sesuai dengan topik diskusi"
          />
          
          <div>
            <label className="block font-body font-medium text-sm text-foreground mb-2">
              Isi Diskusi *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Jelaskan pertanyaan atau topik diskusi Anda dengan detail..."
              className="w-full h-40 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body text-sm"
              required
            />
            <p className="font-caption text-xs text-muted-foreground mt-1">
              Berikan konteks yang cukup agar peserta lain dapat memberikan jawaban yang tepat
            </p>
          </div>
          
          <Input
            label="Tag (Opsional)"
            type="text"
            placeholder="anatomi, jantung, sistem kardiovaskular"
            value={formData.tags}
            onChange={(e) => handleInputChange('tags', e.target.value)}
            description="Pisahkan tag dengan koma untuk memudahkan pencarian"
          />
          
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div>
                <h4 className="font-body font-semibold text-sm text-foreground mb-1">
                  Tips Diskusi yang Baik
                </h4>
                <ul className="font-caption text-xs text-muted-foreground space-y-1">
                  <li>• Gunakan judul yang spesifik dan jelas</li>
                  <li>• Berikan konteks yang cukup dalam isi diskusi</li>
                  <li>• Sertakan referensi jika memungkinkan</li>
                  <li>• Gunakan bahasa yang sopan dan profesional</li>
                  <li>• Tambahkan tag untuk memudahkan pencarian</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Send"
              iconPosition="left"
            >
              Buat Diskusi
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateThreadModal;