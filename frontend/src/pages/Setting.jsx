import React, { useState } from "react";
import { User, Lock, Mail, Phone, Home, Save, Eye, EyeOff } from "lucide-react";

const sections = [
  {
    id: "profile",
    label: "Profile Information",
    icon: <User className="h-5 w-5" />,
  },
  {
    id: "password",
    label: "Password & Security",
    icon: <Lock className="h-5 w-5" />,
  },
  {
    id: "preferences",
    label: "Preferences",
    icon: <Home className="h-5 w-5" />,
  },
];
export default function SettingPage() {
  const [activeSection, setActiveSection] =
    useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const handleSave = (section) => {
    setSuccessMessage(`${section} updated successfully!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };
  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="h-12 w-12 text-gray-400" />
        </div>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
          Change Photo
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            defaultValue="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            defaultValue="Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              defaultValue="john.doe@example.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="tel"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              defaultValue="+1 (555) 123-4567"
            />
          </div>
        </div>
      </div>
    </div>
  );
  const renderPasswordSection = () => (
    <div className="space-y-6 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <button
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          New Password
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <button
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm New Password
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>
    </div>
  );
  const renderPreferencesSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="rounded text-green-600 focus:ring-green-500"
              defaultChecked
            />
            <span>Email notifications for orders</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="rounded text-green-600 focus:ring-green-500"
              defaultChecked
            />
            <span>SMS notifications for delivery updates</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="rounded text-green-600 focus:ring-green-500"
            />
            <span>Newsletter and promotional emails</span>
          </label>
        </div>
      </div>
    </div>
  );
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-medium text-gray-900 mb-6">Settings</h2>
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <aside className="w-full md:w-64 border-r">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-6 py-4 text-left ${activeSection === section.id ? "bg-gray-50 border-l-4 border-green-500" : "hover:bg-gray-50"}`}
                >
                  {section.icon}
                  <span>{section.label}</span>
                </button>
              ))}
            </aside>
            <div className="flex-1 p-6">
              {activeSection === "profile" && renderProfileSection()}
              {activeSection === "password" && renderPasswordSection()}
              {activeSection === "preferences" && renderPreferencesSection()}
              <div className="mt-6 pt-6 border-t flex justify-end">
                <button
                  onClick={() =>
                    handleSave(
                      sections.find((s) => s.id === activeSection)?.label || "",
                    )
                  }
                  className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Save className="h-5 w-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
