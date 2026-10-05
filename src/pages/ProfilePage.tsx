import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, MapPin, Lock, Save, ShieldCheck } from 'lucide-react';

interface ProfilePageProps {
  navigate: (page: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ navigate }) => {
  const { user, updateProfile, isAdmin } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [city, setCity] = useState(user?.city || 'Gilgit');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Name cannot be blank.', 'error');
      return;
    }

    if (newPassword) {
      if (!currentPassword) {
        showToast('Please provide your current password to change it.', 'error');
        return;
      }
      if (newPassword.length < 6) {
        showToast('New password must be at least 6 characters.', 'error');
        return;
      }
      if (newPassword !== confirmPassword) {
        showToast('New passwords do not match.', 'error');
        return;
      }
    }

    setSubmitting(true);
    const res = await updateProfile({
      name: name.trim(),
      city,
      currentPassword: currentPassword || undefined,
      newPassword: newPassword || undefined,
    });
    setSubmitting(false);

    if (res.success) {
      showToast('Profile updated successfully!', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      showToast(res.error || 'Failed to update profile.', 'error');
    }
  };

  return (
    <div className="py-10 sm:py-16 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-[#0F4C81] text-white flex items-center justify-center text-2xl font-bold shadow-md">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Profile Settings
                </h1>
                {isAdmin && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold">
                    Administrator
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Manage your identity and language region preferences.</p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81] text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address (Immutable)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                City / Region
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81] text-slate-900 dark:text-white"
                >
                  <option value="Gilgit">Gilgit City</option>
                  <option value="Skardu">Skardu (Baltistan)</option>
                  <option value="Hunza">Hunza Valley</option>
                  <option value="Nagar">Nagar Valley</option>
                  <option value="Diamer">Diamer / Chilas</option>
                  <option value="Ghizer">Ghizer (Gupis / Yasin)</option>
                  <option value="Astore">Astore</option>
                  <option value="Ghanche">Ghanche (Khaplu)</option>
                  <option value="Islamabad">Islamabad / National</option>
                  <option value="International">International Traveler</option>
                </select>
              </div>
            </div>

            {/* Change Password Block */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Change Password
              </h3>
              <p className="text-xs text-slate-500 mb-4">Leave blank if you do not wish to change your password.</p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81] text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81] text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81] text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate('dashboard')}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:underline"
              >
                Back to Dashboard
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#0F4C81] hover:bg-[#0c3e6a] shadow-md transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
