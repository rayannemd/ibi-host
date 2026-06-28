import {Routes, Route} from 'react-router-dom';
import {lazy, Suspense} from 'react';
import PrivateRoute from './PrivateRoute.jsx';

const Login = lazy(() => import('../Pages/loginPage/Login'));
const HomePage = lazy(() => import('../Pages/homePage/HomePage.jsx'));
const RegisterResidentPage = lazy(() => import('../Pages/registerResidentPage/RegisterResidentPage.jsx'));
const RegisterRoomPage = lazy(() => import('../Pages/registerRoom/RegisterRoom.jsx'));
const CheckGuests = lazy(() => import('../Pages/checkGuests/CheckGuests.jsx'));
const RegisterGuest = lazy(() => import('../components/Reservations/registerGuest/RegisterGuest.jsx'));
const Reservation = lazy(() => import('../components/Reservations/reservation/Reservation.jsx'));
const CheckIn = lazy(() => import('../Pages/checkIn/CheckIn.jsx'));
const SelectedReservationCheckIn = lazy(() => import('../Pages/checkIn/SelectedReservationCheckIn.jsx'));
const CheckOut = lazy(() => import('../Pages/checkOut/CheckOut.jsx'));
const SelectedReservationCheckOut = lazy(() => import("../Pages/checkOut/SelectedReservationCheckOut.jsx"));
const CheckInSuccess = lazy(() => import("../Pages/checkIn/CheckInSuccess.jsx"));
const GridAllRooms = lazy(() => import('../components/gridAllRooms/GridAllRooms.jsx'));
const CheckOutSuccess = lazy(() => import("../Pages/checkOut/CheckOutSuccess.jsx"));

function AppRoutes() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/menu" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                <Route path="/registerResident" element={<PrivateRoute><RegisterResidentPage /></PrivateRoute>} />
                <Route path="/registerRoom" element={<PrivateRoute><RegisterRoomPage /></PrivateRoute>} />
                <Route path="/checkGuests" element={<PrivateRoute><CheckGuests /></PrivateRoute>} />
                <Route path="/registerGuest" element={<PrivateRoute><RegisterGuest /></PrivateRoute>} />
                <Route path="/reservation" element={<PrivateRoute><Reservation /></PrivateRoute>} />
                <Route path="/checkIn" element={<PrivateRoute><CheckIn /></PrivateRoute>} />
                <Route path="/selectedReservationCheckIn" element={<PrivateRoute><SelectedReservationCheckIn /></PrivateRoute>} />
                <Route path="/checkOut" element={<PrivateRoute><CheckOut /></PrivateRoute>} />
                <Route path="/checkOut/selectedReservationCheckOut" element={<PrivateRoute><SelectedReservationCheckOut/></PrivateRoute>} />
                <Route path="/checkInSuccess" element={<PrivateRoute><CheckInSuccess /></PrivateRoute>} />
                <Route path="/checkOutSuccess" element={<PrivateRoute><CheckOutSuccess /></PrivateRoute>} />
                <Route path="/rooms" element={<PrivateRoute><GridAllRooms /></PrivateRoute>} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes; 