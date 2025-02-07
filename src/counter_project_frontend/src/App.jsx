import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus, FiRefreshCw, FiShare2 } from 'react-icons/fi';
import { counter_project_backend } from 'declarations/counter_project_backend';

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  color: #2d3748;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: bold;
`;

const Subtitle = styled.p`
  color: #718096;
  font-size: 0.875rem;
  margin-bottom: 2rem;
`;

const CounterValue = styled(motion.div)`
  font-size: 6rem;
  font-weight: bold;
  color: #4a5568;
  margin: 2rem 0;
  font-family: 'Inter', sans-serif;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s;
  
  ${props => props.primary ? `
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: white;
  ` : `
    background: #f8fafc;
    color: #4a5568;
    border: 2px solid #e2e8f0;
  `}

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const IconButton = styled(motion.button)`
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f7fafc;
  }
`;

const ErrorMessage = styled(motion.div)`
  color: #e53e3e;
  padding: 0.75rem;
  border-radius: 8px;
  background: #fff5f5;
  margin-bottom: 1rem;
`;

const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 3px solid #f0f0f0;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  margin: 2rem auto;
`;

const Notification = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const App = () => {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchCounter();
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchCounter = async () => {
    try {
      setLoading(true);
      const currentCounter = await counter_project_backend.get_value();
      setCounter(currentCounter);
      setError(null);
    } catch (error) {
      setError("Failed to fetch counter value");
    } finally {
      setLoading(false);
    }
  };

  const handleOperation = async (operation, operationName) => {
    try {
      setUpdating(true);
      await operation();
      const newValue = await counter_project_backend.get_value();
      setCounter(newValue);
      setError(null);
      showNotification(`Counter ${operationName} to ${newValue}`);
    } catch (error) {
      setError(`Failed to ${operationName.toLowerCase()} counter`);
    } finally {
      setUpdating(false);
    }
  };

  const increment = () => handleOperation(counter_project_backend.increment, "increased");
  const decrement = () => handleOperation(counter_project_backend.decrement, "decreased");
  const reset = () => handleOperation(() => setCounter(0), "reset");

  const shareCounter = () => {
    navigator.clipboard.writeText(`${window.location.origin}?count=${counter}`);
    showNotification("Counter link copied to clipboard!");
  };

  return (
    <Container>
      <Card>
        <Title>Internet Computer Counter</Title>
        <Subtitle>Powered by Rust & React</Subtitle>

        <AnimatePresence>
          {error && (
            <ErrorMessage
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {error}
            </ErrorMessage>
          )}
        </AnimatePresence>

        {loading ? (
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <CounterValue
            key={counter}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            {counter}
          </CounterValue>
        )}

        <ButtonGroup>
          <Button
            disabled={updating || loading}
            onClick={decrement}
            whileTap={{ scale: 0.95 }}
          >
            <FiMinus /> Decrease
          </Button>

          <Button
            primary
            disabled={updating || loading}
            onClick={increment}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus /> Increase
          </Button>
        </ButtonGroup>

        <ActionBar>
          <IconButton
            onClick={reset}
            disabled={updating || loading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiRefreshCw size={20} />
          </IconButton>
          
        </ActionBar>

        <AnimatePresence>
          {notification && (
            <Notification
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              {notification}
            </Notification>
          )}
        </AnimatePresence>
      </Card>
    </Container>
  );
};

export default App;