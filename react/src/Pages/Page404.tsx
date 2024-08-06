import React, { useEffect } from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../Contexts/LoadingContext"; // Import useLoading

const Page404 = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading(); // Use useLoading hook

  useEffect(() => {
    setLoading(false); // Ensure loading is false on 404 page
  }, [setLoading]);

  const handleBackHome = () => {
    navigate(-1);
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleBackHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default Page404;
