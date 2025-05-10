import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function AdminPrivateRoute() {
  const {currentStudent} = useSelector((state) => state.student);
  return currentStudent ? <Outlet /> : <Navigate to="student-signin" />;
}
