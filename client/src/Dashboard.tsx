import React, {useState, useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase-config";
import axios from "axios";
import {SERVER_ENDPOINT} from "./constants";
import styled from "styled-components";

export const Container = styled.div`
  margin: 24px;
`;
interface Analytics {
  totalUsers: number;
  usersToday: number;
}
const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalUsers: 0,
    usersToday: 0,
  });
  const ADMIN_UID =
    process.env.REACT_APP_NODE_ENV === "production"
      ? process.env.REACT_APP_ADMIN
      : process.env.REACT_APP_ADMIN_DEV;

  useEffect(() => {
    const fetchTotalUsers = async () => {
      const response = await axios.get(`${SERVER_ENDPOINT}/user_count`);
      const result = response.data;
      setAnalytics((prevAnalytics) => ({
        ...prevAnalytics,
        totalUsers: result,
      }));
    };
    const fetchUsersToday = async () => {
      const response = await axios.get(
        `${SERVER_ENDPOINT}/users_registered_today`
      );
      const result = response.data;
      setAnalytics((prevAnalytics) => ({...prevAnalytics, usersToday: result}));
    };
    fetchTotalUsers();
    fetchUsersToday();
  }, []);
  if (user?.uid !== ADMIN_UID) {
    return <div></div>;
  }
  return (
    <Container>
      <div>total users: {analytics.totalUsers}</div>
      <div>users registered today: {analytics.usersToday}</div>
    </Container>
  );
};

export default Dashboard;
