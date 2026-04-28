import React, { useContext, useEffect, useState } from 'react';
import { Plus, X, CircleX, Shield, MapPin, AlertCircle, UserPlus, Phone } from 'lucide-react';
import BottomNav from './BottomNav';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext';
import api from '../../../URL/CustomApi';
import { Config } from '../../../URL/Config';
import Loader from './Loader';
import { toast } from "react-toastify";
import { motion, AnimatePresence } from 'framer-motion';

function AfterLogin() {
  const [showAddContact, setShowAddContact] = useState(false);
  const { handleSubmit, register, reset: resetForm } = useForm();
  const { user, setUser } = useContext(AuthContext);
  const [contactsdata, setContactsdata] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [MobileNo, setMobileNo] = useState([]);
  const [locationMethod, setLocationMethod] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [sosActive, setSosActive] = useState(false);

  useEffect(() => {
    setContactsdata(Array.isArray(user?.contacts) ? user.contacts : []);
    setMobileNo(Array.isArray(user?.contacts) ? user.contacts : []);
  }, [user]);

  const Submit = async (formData) => {
    setShowLoader(true);
    try {
      const contactData = new FormData();
      if (formData.photo && formData.photo[0]) contactData.append('photo', formData.photo[0]);
      contactData.append('name', formData.name);
      contactData.append('MobileNo', formData.MobileNo);
      const { data: responseData } = await api.post(Config.ContactUrl, contactData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (responseData) {
        setUser(prev => ({ ...prev, contacts: [...(prev.contacts || []), responseData.contact] }));
        setShowAddContact(false);
        resetForm();
        toast.success('Contact added!');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      toast.error('Failed to add contact');
    } finally { setShowLoader(false); }
  };

  const handleDelete = async (contactId) => {
    setShowLoader(true);
    try {
      const response = await api.delete(Config.DELETECONTACTUrl, { params: { contactId } });
      if (response.status === 200) {
        setContactsdata(prev => prev.filter(c => c._id !== contactId));
        setUser(prev => ({ ...prev, contacts: prev.contacts.filter(c => c._id !== contactId) }));
        toast.success('Contact removed');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    } finally { setShowLoader(false); }
  };

  const getIPBasedLocation = async () => {
    try {
      let response = await fetch('https://ipapi.co/json/');
      if (!response.ok) throw new Error('First IP API failed');
      const data = await response.json();
      if (data.latitude && data.longitude) return { latitude: data.latitude, longitude: data.longitude, accuracy: 50000, method: 'ipapi' };
      response = await fetch('https://ipwho.is/');
      if (!response.ok) throw new Error('Second IP API failed');
      const fallbackData = await response.json();
      return { latitude: fallbackData.latitude, longitude: fallbackData.longitude, accuracy: 50000, method: 'ipwhois' };
    } catch (error) { throw new Error('Could not determine approximate location from IP'); }
  };

  const getLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000 })
        );
        setLocationMethod('gps');
        return { latitude: position.coords.latitude, longitude: position.coords.longitude, accuracy: position.coords.accuracy, method: 'gps' };
      } catch {}
    }
    try {
      const ipLocation = await getIPBasedLocation();
      setLocationMethod('ip');
      return ipLocation;
    } catch { throw new Error('Could not determine your location'); }
  };

  const handleSHAKTI = async () => {
    setSosActive(true);
    setShowLoader(true);
    setLocationError(null);
    try {
      if (MobileNo.length === 0) throw new Error('No emergency contacts available');
      const location = await getLocation();
      const contactNumbers = MobileNo.map(c => c.MobileNo);

      await api.post(Config.EMERGENCYUrl, {
        contactNumbers,
        location: { latitude: location.latitude, longitude: location.longitude }
      });

      // Save SOS log
      await api.post(Config.ADDSOSLOGUrl, {
        location: { latitude: location.latitude, longitude: location.longitude },
        contactsAlerted: contactNumbers,
        status: 'success'
      });

      toast.success('🚨 Emergency alert sent!');
    } catch (error) {
      setLocationError(error.message);
      toast.error('Alert failed: ' + error.message);
    } finally {
      setShowLoader(false);
      setTimeout(() => setSosActive(false), 3000);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .home-root { font-family: 'DM Sans', sans-serif; background: #0a0a0f; }
        .home-title { font-family: 'Syne', sans-serif; }
        .grid-bg {
          background-image: linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .glass { background: rgba(18,18,26,0.8); backdrop-filter: blur(20px); border: 1px solid rgba(124,58,237,0.2); }
        .glass-light { background: rgba(255,255,255,0.04); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08); }
        .contact-card { background: rgba(18,18,26,0.9); backdrop-filter: blur(20px); border: 1px solid rgba(124,58,237,0.18); transition: all 0.3s; }
        .contact-card:hover { border-color: rgba(124,58,237,0.4); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(124,58,237,0.15); }
        .sos-ring-1 { position:absolute; inset:-16px; border-radius:50%; border:2px solid rgba(239,68,68,0.3); animation: sosPulse 2s ease-out infinite; }
        .sos-ring-2 { position:absolute; inset:-32px; border-radius:50%; border:2px solid rgba(239,68,68,0.2); animation: sosPulse 2s ease-out infinite 0.4s; }
        .sos-ring-3 { position:absolute; inset:-48px; border-radius:50%; border:1px solid rgba(239,68,68,0.1); animation: sosPulse 2s ease-out infinite 0.8s; }
        @keyframes sosPulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          100% { transform: scale(1.15); opacity: 0; }
        }
        .sos-btn {
          width: 220px; height: 220px; border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #ef4444, #991b1b);
          box-shadow: 0 0 60px rgba(239,68,68,0.4), 0 0 120px rgba(239,68,68,0.15), inset 0 2px 4px rgba(255,255,255,0.15);
          cursor: pointer; transition: all 0.3s; position: relative;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          border: 2px solid rgba(239,68,68,0.5);
        }
        .sos-btn:hover { box-shadow: 0 0 80px rgba(239,68,68,0.6), 0 0 160px rgba(239,68,68,0.2); transform: scale(1.04); }
        .sos-btn:active { transform: scale(0.97); }
        .sos-active { animation: sosFlash 0.5s ease-in-out 3; }
        @keyframes sosFlash { 0%,100%{box-shadow:0 0 60px rgba(239,68,68,0.4);} 50%{box-shadow:0 0 100px rgba(239,68,68,0.9), 0 0 200px rgba(239,68,68,0.4);} }
        .modal-bg { background:rgba(8,8,12,0.9); backdrop-filter:blur(24px); }
        .modal-card { background:rgba(18,18,26,0.98); border:1px solid rgba(124,58,237,0.3); box-shadow:0 0 60px rgba(124,58,237,0.2), 0 40px 80px rgba(0,0,0,0.7); }
        .m-input { background:rgba(255,255,255,0.04); border:1px solid rgba(124,58,237,0.22); color:#f1f5f9; transition:all 0.3s; }
        .m-input:focus { outline:none; border-color:rgba(168,85,247,0.6); background:rgba(124,58,237,0.07); box-shadow:0 0 0 3px rgba(124,58,237,0.12); }
        .m-input::placeholder { color:rgba(148,163,184,0.4); }
        .add-btn { background:linear-gradient(135deg,#7c3aed,#a855f7); box-shadow:0 4px 20px rgba(124,58,237,0.4); transition:all 0.3s; }
        .add-btn:hover { box-shadow:0 8px 28px rgba(124,58,237,0.55); transform:translateY(-1px); }
        .status-pill { background:rgba(124,58,237,0.15); border:1px solid rgba(124,58,237,0.3); }
      `}</style>

      <div className="home-root min-h-screen relative pb-24">
        <div className="absolute inset-0 grid-bg" />

        {/* Ambient glow */}
        <div style={{ position:'absolute', top:'-100px', left:'50%', transform:'translateX(-50%)', width:'600px', height:'400px', background:'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)', pointerEvents:'none' }} />

        <div className="relative z-10">

          {/* Header */}
          <div className="px-5 pt-6 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div style={{ width:40,height:40,background:'linear-gradient(135deg,#7c3aed,#a855f7)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 16px rgba(124,58,237,0.4)',fontSize:18 }}>
                🛡️
              </div>
              <div>
                <h1 className="home-title text-white font-bold text-lg leading-tight">Shakti Shield</h1>
                <p className="text-slate-500 text-xs">Stay protected</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="status-pill px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <div style={{ width:6,height:6,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 8px #22c55e' }} />
                <span className="text-slate-300 text-xs">{locationMethod === 'gps' ? 'GPS' : 'Active'}</span>
              </div>
            </div>
          </div>

          {/* Greeting */}
          <div className="px-5 mb-8">
            <h2 className="home-title text-2xl font-bold text-white">
              Hello, {user?.username || 'User'} 👋
            </h2>
            <p className="text-slate-500 text-sm mt-1">You're protected. Press SOS if you need help.</p>
          </div>

          {/* SOS Button */}
          <div className="flex flex-col items-center justify-center py-6 px-5">
            <div className="relative flex items-center justify-center" style={{ width:320, height:320 }}>
              {/* Rings */}
              <div className="sos-ring-1" style={{ inset:'-20px' }} />
              <div className="sos-ring-2" style={{ inset:'-40px' }} />
              <div className="sos-ring-3" style={{ inset:'-60px' }} />

              {/* Button */}
              <motion.div
                className={`sos-btn ${sosActive ? 'sos-active' : ''}`}
                onClick={handleSHAKTI}
                whileTap={{ scale: 0.95 }}
              >
                <span style={{ fontSize:48, marginBottom:4 }}>🆘</span>
                <span className="home-title text-white font-black text-2xl tracking-widest">SHAKTI</span>
                <div style={{ width:60, height:2, background:'rgba(255,220,50,0.8)', borderRadius:2, margin:'6px 0' }} />
                <span className="text-yellow-300 font-bold text-sm tracking-widest">SHIELD</span>
              </motion.div>
            </div>

            <p className="text-slate-500 text-xs text-center mt-4 max-w-xs">
              Press to instantly alert all your emergency contacts with your live location
            </p>

            {locationError && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2"
                style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', color:'#fca5a5' }}
              >
                <AlertCircle size={14} />
                {locationError}
              </motion.div>
            )}
          </div>

          {/* Contacts Section */}
          <div className="px-5 mt-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="home-title text-white font-bold text-lg">Emergency Contacts</h3>
                <p className="text-slate-500 text-xs">{contactsdata.length}/10 contacts added</p>
              </div>
              <motion.button
                onClick={() => setShowAddContact(true)}
                disabled={contactsdata.length >= 10}
                className="add-btn flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                whileTap={{ scale: 0.97 }}
              >
                <UserPlus size={15} />
                Add
              </motion.button>
            </div>

            {contactsdata.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <div style={{ width:56, height:56, background:'rgba(124,58,237,0.15)', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:24 }}>
                  👥
                </div>
                <p className="text-white font-semibold mb-1">No contacts yet</p>
                <p className="text-slate-500 text-sm">Add trusted people to alert in emergencies</p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {contactsdata.map((contact, index) => (
                  <motion.div
                    key={contact._id || index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="contact-card rounded-2xl p-4 flex items-center gap-4"
                  >
                    <div className="relative">
                      <img
                        className="w-12 h-12 rounded-xl object-cover"
                        src={contact.photo}
                        alt={contact.name}
                        style={{ border:'2px solid rgba(124,58,237,0.4)' }}
                      />
                      <div style={{ position:'absolute', bottom:-2, right:-2, width:12, height:12, background:'#22c55e', borderRadius:'50%', border:'2px solid #0a0a0f' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{contact.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Phone size={11} className="text-purple-400" />
                        <p className="text-slate-400 text-xs">{contact.MobileNo}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                      style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.25)' }}
                    >
                      <CircleX size={15} className="text-red-400" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add Contact Modal */}
        <AnimatePresence>
          {showAddContact && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-bg fixed inset-0 flex items-center justify-center p-4 z-50"
              onClick={e => e.target === e.currentTarget && setShowAddContact(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25 }}
                className="modal-card rounded-3xl w-full max-w-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="home-title text-white font-bold text-xl">Add Contact</h2>
                      <p className="text-slate-500 text-xs mt-0.5">Add a trusted emergency contact</p>
                    </div>
                    <button onClick={() => setShowAddContact(false)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                      style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
                      <X size={16} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit(Submit)} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Photo (optional)</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="m-input block w-full px-3 py-2.5 rounded-xl text-sm text-slate-300
                          file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0
                          file:text-xs file:font-medium file:bg-purple-600/80 file:text-white hover:file:bg-purple-600"
                        {...register('photo')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Name</label>
                      <input type="text" className="m-input w-full px-4 py-3 rounded-xl text-sm" placeholder="Contact's full name" {...register('name', { required: true })} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Mobile Number</label>
                      <input type="text" className="m-input w-full px-4 py-3 rounded-xl text-sm" placeholder="10-digit mobile number" {...register('MobileNo', { required: true })} />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setShowAddContact(false)}
                        className="flex-1 py-3 rounded-xl text-slate-300 text-sm font-medium transition-colors hover:text-white"
                        style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
                        Cancel
                      </button>
                      <button type="submit"
                        className="add-btn flex-1 py-3 rounded-xl text-white text-sm font-semibold">
                        Add Contact
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {showLoader && (
          <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background:'rgba(8,8,12,0.8)', backdropFilter:'blur(8px)' }}>
            <Loader />
          </div>
        )}

        <BottomNav />
      </div>
    </>
  );
}

export default AfterLogin;