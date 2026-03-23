import { MOCK_SERVICE_OTP } from '../components/independent-pro/serviceWorkflow/utils';

const delay = async (duration = 800) =>
  new Promise(resolve => {
    setTimeout(resolve, duration);
  });

export const requestOtp = async (serviceId: string) => {
  await delay(900);

  return {
    serviceId,
    otp: MOCK_SERVICE_OTP,
    cooldownSeconds: 30,
    maskedPhone: '+91 98XXXXXX42',
    message: 'Service OTP sent to the customer successfully.',
  };
};

export const verifyOtp = async (serviceId: string, otp: string) => {
  await delay(1000);

  if (otp !== MOCK_SERVICE_OTP) {
    throw new Error('Invalid OTP. Please ask the customer for the latest code.');
  }

  return {
    serviceId,
    message: 'OTP verified successfully.',
  };
};

export const startService = async (serviceId: string) => {
  await delay(700);

  return {
    serviceId,
    startTime: new Date().toISOString(),
    message: 'Service has started successfully.',
  };
};

export const completeService = async (serviceId: string) => {
  await delay(900);

  return {
    serviceId,
    completionTime: new Date().toISOString(),
    message: 'Service completed successfully.',
  };
};
