"use client";

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange, isAdmin, getCurrentUser } from '@/lib/auth';
import AdminLogin from '@/components/admin/admin-login';
import AdminDashboard from '@/components/admin/admin-dashboard';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin(user)) {
    return <AdminLogin />;
  }

  return <AdminDashboard user={user} />;
}