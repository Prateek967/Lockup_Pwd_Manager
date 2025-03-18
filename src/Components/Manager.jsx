import React, { useEffect, useState } from "react";

const Manager = () => {
  const [masterPassword, setMasterPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newMasterPassword, setNewMasterPassword] = useState("");
  const [showNewMasterPassword, setShowNewMasterPassword] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    const storedMasterPassword = localStorage.getItem("masterPassword");
    if (!storedMasterPassword) {
      localStorage.setItem("masterPassword", "secureMaster123");
    }
  }, []);

  useEffect(() => {
    const storedPasswords = localStorage.getItem("passwords");
    if (storedPasswords) {
      setPasswordArray(JSON.parse(storedPasswords));
    }
  }, []);

  const authenticate = () => {
    const storedMasterPassword = localStorage.getItem("masterPassword");
    if (masterPassword === storedMasterPassword) {
      setIsUnlocking(true); // Start unlocking animation
      setTimeout(() => {
        setIsUnlocking(false);
        setIsAuthenticated(true); // Authenticate after animation
      }, 3000); // Animation duration (3 seconds)
    } else {
      alert("Invalid Master Password!");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setMasterPassword("");
  };

  const updateMasterPassword = () => {
    if (!newMasterPassword) {
      alert("Please enter a new master password!");
      return;
    }
    localStorage.setItem("masterPassword", newMasterPassword);
    alert("Master password updated successfully!");
    setNewMasterPassword("");
    setShowChangePassword(false);
  };

  const savePassword = () => {
    if (!form.site || !form.username || !form.password) {
      alert("Please fill all the fields!");
      return;
    }

    if (editIndex !== null) {
      const updatedPasswords = [...passwordArray];
      updatedPasswords[editIndex] = form;
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      alert("Password updated successfully!");
      setEditIndex(null);
    } else {
      const updatedPasswords = [...passwordArray, { ...form, showPassword: false }];
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      alert("Password saved successfully!");
    }
    setForm({ site: "", username: "", password: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (index) => {
    setForm(passwordArray[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedPasswords = passwordArray.filter((_, i) => i !== index);
    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    alert("Password deleted successfully!");
  };

  const togglePasswordVisibility = (index) => {
    const updatedPasswords = [...passwordArray];
    updatedPasswords[index].showPassword = !updatedPasswords[index].showPassword;
    setPasswordArray(updatedPasswords);
  };

  if (!isAuthenticated) {
    if (isUnlocking) {
      // Display GIF while unlocking
      return (
        <div className="flex items-center justify-center h-screen bg-blue-500">
          <img
            src="icons/lockt.gif" // Path to the uploaded GIF
            alt="Unlocking Animation"
            className="w-40 h-42"
          />
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-screen bg-blue-500">
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center border-2 border-blue-300">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Master Lock</h2>
          <input
            type="password"
            className="w-full p-2 border-2 border-blue-500 focus:outline-none focus:border-blue-700 rounded-lg mb-4"
            placeholder="Enter Master Password"
            value={masterPassword}
            onChange={(e) => setMasterPassword(e.target.value)}
          />
          <button
            onClick={authenticate}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Unlock
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center py-6">
      <div className="container mx-auto px-4">
        {/* Header with Logo */}
        <div className="flex justify-between items-center mb-6 w-full">
          <div className="flex items-center gap-3">
            <img
              src="icons/lock.png"
              alt="Logo"
              className="w-12 h-12"
            />
            <h1 className="text-3xl font-bold text-blue-600">Password Manager</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={logout}
              className="bg-red-500 text-white text-sm px-3 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="bg-blue-500 text-white text-sm px-3 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Change Master Password
            </button>
          </div>
        </div>

        {/* Change Master Password Section */}
        {showChangePassword && (
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Update Master Password</h2>
            <input
              type={showNewMasterPassword ? "text" : "password"}
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Enter New Master Password"
              value={newMasterPassword}
              onChange={(e) => setNewMasterPassword(e.target.value)}
            />
            <button
              onClick={() => setShowNewMasterPassword(!showNewMasterPassword)}
              className="bg-gray-200 text-blue-500 text-sm px-3 py-2 rounded-lg hover:bg-gray-300 transition mb-4"
            >
              {showNewMasterPassword ? "Hide Password" : "Show Password"}
            </button>
            <button
              onClick={updateMasterPassword}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Update Password
            </button>
          </div>
        )}

        {/* Add/Edit Password Form */}
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto mt-6">
          <h2 className="text-xl font-bold mb-4 text-center">Add/Edit Password</h2>
          <input
            type="text"
            name="site"
            placeholder="Website"
            value={form.site}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mb-4"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mb-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mb-4"
          />
          <button
            onClick={savePassword}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {editIndex !== null ? "Update Password" : "Add Password"}
          </button>
        </div>

        {/* Saved Passwords Table */}
        {passwordArray.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-lg mt-6 w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Saved Passwords</h2>
            <table className="table-auto w-full border-collapse border border-blue-500">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border px-4 py-2">Website</th>
                  <th className="border px-4 py-2">Username</th>
                  <th className="border px-4 py-2">Password</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((entry, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-100">
                    <td className="border px-4 py-2">{entry.site}</td>
                    <td className="border px-4 py-2">{entry.username}</td>
                    <td className="border px-4 py-2">
                      {entry.showPassword ? entry.password : "****"}
                      <button
                        onClick={() => togglePasswordVisibility(index)}
                        className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm"
                      >
                        {entry.showPassword ? "Hide" : "Show"}
                      </button>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-green-500 text-white px-2 py-1 rounded-lg text-sm mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manager;
