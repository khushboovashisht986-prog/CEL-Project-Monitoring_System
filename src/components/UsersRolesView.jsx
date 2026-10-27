import { MOCK_USERS } from '../data/mockData.js';
import { useEffect, useState } from 'react';

export default function UsersRolesView({ onBackToProjects, onUserUpdate }) {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('cel-demo-users');

    return savedUsers ? JSON.parse(savedUsers) : MOCK_USERS;
  });
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Member',
  });
  useEffect(() => {
    localStorage.setItem('cel-demo-users', JSON.stringify(users));
  }, [users]);

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Users & Roles
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage users and review their assigned roles.
          </p>
        </div>

        <button
          onClick={onBackToProjects}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Back to Projects
        </button>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
        >
          + Add User
        </button>
      </div>
      {showForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const user = {
              id: Date.now(),
              ...newUser,
              status: 'Active',
            };

            setUsers((previousUsers) => [...previousUsers, user]);
            setNewUser({ name: '', email: '', role: 'Member' });
            setShowForm(false);
          }}
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-5"
        >
          <h2 className="text-lg font-semibold">Add New User</h2>

          <input
            required
            value={newUser.name}
            onChange={(e) =>
              setNewUser({ ...newUser, name: e.target.value })
            }
            placeholder="Full name"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />

          <input
            required
            type="email"
            value={newUser.email}
            onChange={(e) =>
              setNewUser({ ...newUser, email: e.target.value })
            }
            placeholder="Email address"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />

          <select
            value={newUser.role}
            onChange={(e) =>
              setNewUser({ ...newUser, role: e.target.value })
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option>Administrator</option>
            <option>Project Manager</option>
            <option>Member</option>
          </select>

          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white"
          >
            Save User
          </button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="ml-2 rounded-lg border px-4 py-2 text-sm"
          >
            Cancel
          </button>
        </form>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email or role..."
          className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Role</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 font-medium text-slate-800">
                  {user.name}
                </td>
                <td className="px-5 py-4 text-slate-600">{user.email}</td>
                <td className="px-5 py-4">{user.role}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => {
                      const name = prompt('Enter new name:', user.name);
                      if (name === null || !name.trim()) return;

                      const email = prompt('Enter new email:', user.email);
                      if (email === null || !email.trim()) return;

                      const role = prompt(
                        'Enter role: Administrator, Project Manager, or Member',
                        user.role
                      );

                      if (!['Administrator', 'Project Manager', 'Member'].includes(role)) {
                        alert('Invalid role');
                        return;
                      }

                      setUsers((previousUsers) =>
                        previousUsers.map((item) =>
                          item.id === user.id
                            ? { ...item, name: name.trim(), email: email.trim(), role }
                            : item
                        )
                      );
                      if (user.id === 1 && onUserUpdate) {
                        onUserUpdate({
                          ...user,
                          name: name.trim(),
                          email: email.trim(),
                          role,
                        });
                      }
                    }}
                    className="rounded border border-blue-300 px-3 py-1 text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      const newPassword = prompt(
                        `Set a temporary demo password for ${user.name}:`
                      );

                      if (newPassword === null || !newPassword.trim()) return;

                      alert(`Demo password set for ${user.name}.`);
                    }}
                    className="ml-2 rounded border border-amber-300 bg-amber-100 px-3 py-1 text-amber-700"
                  >
                    Reset Password
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="px-5 py-8 text-center text-slate-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">
        Demo screen — users are sample data; changes are not saved to a backend.
      </p>
    </div>
  );
}