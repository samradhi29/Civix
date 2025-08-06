import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Shield, AlertTriangle, Heart, Car, Home, Users, ChevronRight, Copy, Check } from 'lucide-react';

const SOSPage = () => {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [copiedNumber, setCopiedNumber] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          setLocationError('');
        },
        (error) => {
          setLocationError('Unable to retrieve location. Please enable location services.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const emergencyNumbers = [
    { name: 'Police Emergency', number: '100', icon: Shield, color: 'bg-blue-600', description: 'Police assistance and law enforcement' },
    { name: 'Fire Emergency', number: '101', icon: AlertTriangle, color: 'bg-red-600', description: 'Fire department and rescue services' },
    { name: 'Medical Emergency', number: '108', icon: Heart, color: 'bg-green-600', description: 'Ambulance and medical emergency' },
    { name: 'Women Helpline', number: '1091', icon: Users, color: 'bg-purple-600', description: '24x7 helpline for women in distress' },
    { name: 'Child Helpline', number: '1098', icon: Users, color: 'bg-pink-600', description: 'Child protection and assistance' },
    { name: 'Disaster Management', number: '108', icon: Car, color: 'bg-orange-600', description: 'Natural disaster and emergency response' }
  ];

  const quickActions = [
    { name: 'Send Location to Emergency Contact', action: () => shareLocation(), icon: MapPin, color: 'bg-indigo-600' },
    { name: 'Medical Information', action: () => alert('Show medical info'), icon: Heart, color: 'bg-red-500' },
    { name: 'Safe Word Alert', action: () => sendSafeWordAlert(), icon: Shield, color: 'bg-yellow-600' },
    { name: 'Record Audio', action: () => startRecording(), icon: AlertTriangle, color: 'bg-gray-600' }
  ];

  const callEmergencyNumber = (number) => {
  };

  const copyToClipboard = async (number) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedNumber(number);
      setTimeout(() => setCopiedNumber(''), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = number;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedNumber(number);
      setTimeout(() => setCopiedNumber(''), 2000);
    }
  };

  const shareLocation = () => {
    if (location) {
      const locationText = `Emergency! My current location: https://maps.google.com/?q=${location.latitude},${location.longitude}`;
      if (navigator.share) {
        navigator.share({
          title: 'Emergency Location',
          text: locationText,
        });
      } else {
        copyToClipboard(locationText);
        alert('Location copied to clipboard!');
      }
    } else {
      alert('Location not available. Please enable location services.');
    }
  };

  const sendSafeWordAlert = () => {
    alert('Safe word alert would be sent to emergency contacts');
  };

  const startRecording = () => {
    alert('Audio recording feature would be activated');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-red-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Emergency SOS</h1>
                <p className="text-red-100">Help is available 24/7</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-red-100 mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Current Time</span>
              </div>
              <div className="text-xl font-mono font-bold">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-6 w-6 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Location</h2>
          </div>
          
          {location ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-green-800 dark:text-green-200 mb-2">
                <strong>Coordinates:</strong> {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </p>
              <p className="text-green-700 dark:text-green-300 text-sm mb-3">
                Accuracy: ±{Math.round(location.accuracy)} meters
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => window.open(`https://maps.google.com/?q=${location.latitude},${location.longitude}`, '_blank')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  View on Google Maps
                </button>
                <button
                  onClick={shareLocation}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Share Location
                </button>
              </div>
            </div>
          ) : locationError ? (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-yellow-800 dark:text-yellow-200 mb-3">{locationError}</p>
              <button
                onClick={getLocation}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-blue-800 dark:text-blue-200">Getting your location...</p>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Phone className="h-6 w-6 text-red-600" />
            Emergency Numbers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyNumbers.map((emergency, index) => {
              const Icon = emergency.icon;
              return (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`${emergency.color} p-2 rounded-full`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{emergency.name}</h3>
                        <p className="text-2xl font-bold text-red-600">{emergency.number}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(emergency.number)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        title="Copy number"
                      >
                        {copiedNumber === emergency.number ? 
                          <Check className="h-4 w-4 text-green-600" /> : 
                          <Copy className="h-4 w-4 text-gray-500" />
                        }
                      </button>
                      <button
                        onClick={() => callEmergencyNumber(emergency.number)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-1"
                      >
                        <Phone className="h-4 w-4" />
                        Call
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{emergency.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className={`${action.color} hover:opacity-90 text-white p-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-between group`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6" />
                    <span className="font-medium">{action.name}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Safety Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">In Case of Emergency:</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Stay calm and assess the situation</li>
                <li>• Call the appropriate emergency number</li>
                <li>• Provide your exact location</li>
                <li>• Follow the operator's instructions</li>
                <li>• Stay on the line until help arrives</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">Important Information:</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Keep emergency numbers easily accessible</li>
                <li>• Share your location with trusted contacts</li>
                <li>• Keep your phone charged</li>
                <li>• Know your medical information</li>
                <li>• Trust your instincts in dangerous situations</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200 text-center font-medium">
              <AlertTriangle className="h-5 w-5 inline mr-2" />
              If you're in immediate danger, call emergency services right away. This page is a tool to help, but professional emergency services should always be your first priority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOSPage;