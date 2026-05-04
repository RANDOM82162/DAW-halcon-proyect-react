import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Camera, Save, Eye, EyeOff, User as UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { getProfile, updateProfile, uploadProfilePhoto } from "@/api/profile";

export function ProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profile, setProfile] = useState<any>(null);
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setProfile(data);
      setName(data.name || "");
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("No se pudo cargar tu perfil.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(null);

    // Validate password fields
    if (newPassword && !currentPassword) {
      setError("Debes ingresar tu contraseña actual para cambiarla.");
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      setError("Las contraseñas nuevas no coinciden.");
      return;
    }

    try {
      setSaving(true);
      const payload: any = {};

      if (name !== profile?.name) {
        payload.name = name;
      }

      if (newPassword) {
        payload.current_password = currentPassword;
        payload.new_password = newPassword;
        payload.new_password_confirmation = confirmPassword;
      }

      if (Object.keys(payload).length === 0) {
        setError("No hay cambios para guardar.");
        return;
      }

      const response = await updateProfile(payload);
      
      // Update localStorage with new user data
      if (response.user) {
        localStorage.setItem("user_data", JSON.stringify(response.user));
      }
      
      setProfile(response.user || profile);
      setSuccess(response.message || "Perfil actualizado exitosamente.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Reload page after a short delay to reflect name change in the header
      setTimeout(() => window.location.reload(), 1500);
    } catch (err: any) {
      const backendMsg = err.response?.data?.message || err.response?.data?.errors;
      if (typeof backendMsg === "object") {
        const firstError = Object.values(backendMsg).flat()[0];
        setError(firstError as string);
      } else {
        setError(backendMsg || "Error al actualizar el perfil.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("La imagen es demasiado grande. Máximo 2MB.");
      return;
    }

    try {
      setUploadingPhoto(true);
      setError(null);
      const response = await uploadProfilePhoto(file);
      
      setProfile({ ...profile, profile_photo: response.profile_photo });

      // Update localStorage
      if (response.user) {
        localStorage.setItem("user_data", JSON.stringify(response.user));
      }
      
      setSuccess("Foto de perfil actualizada.");
      setTimeout(() => window.location.reload(), 1500);
    } catch (err: any) {
      const msg = err.response?.data?.message;
      setError(msg || "Error al subir la foto de perfil.");
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const getPhotoUrl = () => {
    if (!profile?.profile_photo) return null;
    if (profile.profile_photo.startsWith("http")) return profile.profile_photo;
    if (profile.profile_photo.startsWith("/storage/")) return `http://localhost:8000${profile.profile_photo}`;
    return profile.profile_photo;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Cargando perfil...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Editar Perfil</h2>
          <p className="text-gray-500 mt-1">Actualiza tu información personal y contraseña.</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/portal")}
          className="bg-gray-600 text-white hover:bg-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
      </div>

      {/* Feedback Messages */}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200">
          {success}
        </div>
      )}

      {/* Profile Photo Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-medium text-gray-900 mb-4">Foto de Perfil</h3>
        <div className="flex items-center gap-6">
          <div className="relative group">
            {getPhotoUrl() ? (
              <img
                src={getPhotoUrl()!}
                alt="Foto de perfil"
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-200 shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center border-4 border-purple-200 shadow-md">
                <UserIcon className="w-10 h-10 text-purple-500" />
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingPhoto}
              className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Camera className="w-6 h-6 text-white" />
            </button>
          </div>
          <div>
            <p className="text-gray-700 font-medium">{profile?.name}</p>
            <p className="text-gray-500 text-sm">{profile?.email}</p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/jpeg, image/png, image/jpg, image/webp, image/gif"
              onChange={handlePhotoUpload}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingPhoto}
              className="mt-2 text-sm"
            >
              <Camera className="w-3 h-3 mr-1" />
              {uploadingPhoto ? "Subiendo..." : "Cambiar Foto"}
            </Button>
          </div>
        </div>
      </div>

      {/* Name Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-medium text-gray-900 mb-4">Información Personal</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="Tu nombre completo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input
              type="email"
              value={profile?.email || ""}
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">El correo electrónico no se puede cambiar.</p>
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-medium text-gray-900 mb-4">Cambiar Contraseña</h3>
        <p className="text-sm text-gray-500 mb-4">Deja estos campos vacíos si no deseas cambiar tu contraseña.</p>
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>
    </div>
  );
}
