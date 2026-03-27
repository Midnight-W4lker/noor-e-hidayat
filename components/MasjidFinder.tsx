import React from 'react';
import { MasjidManager } from './MasjidManager';

// Wrapper to maintain file structure compatibility if needed, 
// but logic is now centralized in MasjidManager.
export const MasjidFinder: React.FC = () => {
  return <MasjidManager currentUser={null} />;
};
