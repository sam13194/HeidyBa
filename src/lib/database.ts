// Database service for Firebase Realtime Database
import { ref, set, get, push, remove, onValue, off } from "firebase/database";
import { database } from "./firebase";

// Data types
export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  artwork?: string;
  duration?: number;
  createdAt: number;
  updatedAt: number;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  className?: string;
  createdAt: number;
  updatedAt: number;
}

export interface ConcertDate {
  id: string;
  title: string;
  date: string;
  location: string;
  description?: string;
  ticketUrl?: string;
  createdAt: number;
  updatedAt: number;
}

export interface SiteContent {
  heroSection: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  aboutSection: {
    title: string;
    description: string;
    image: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    socialMedia: {
      instagram: string;
      facebook: string;
      youtube: string;
      tiktok: string;
    };
  };
  videos: Array<{
    title: string;
    videoId: string;
    thumbnail: string;
  }>;
  updatedAt?: number;
}

// Audio tracks
export const addAudioTrack = async (track: Omit<AudioTrack, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const tracksRef = ref(database, 'audioTracks');
    const newTrackRef = push(tracksRef);
    const trackData: AudioTrack = {
      ...track,
      id: newTrackRef.key!,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await set(newTrackRef, trackData);
    return { data: trackData, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const getAudioTracks = async () => {
  try {
    const tracksRef = ref(database, 'audioTracks');
    const snapshot = await get(tracksRef);
    if (snapshot.exists()) {
      const tracks = Object.values(snapshot.val()) as AudioTrack[];
      return { data: tracks.sort((a, b) => b.createdAt - a.createdAt), error: null };
    }
    return { data: [], error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const updateAudioTrack = async (id: string, updates: Partial<AudioTrack>) => {
  try {
    const trackRef = ref(database, `audioTracks/${id}`);
    await set(trackRef, { ...updates, updatedAt: Date.now() });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteAudioTrack = async (id: string) => {
  try {
    const trackRef = ref(database, `audioTracks/${id}`);
    await remove(trackRef);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Gallery images
export const addGalleryImage = async (image: Omit<GalleryImage, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const imagesRef = ref(database, 'galleryImages');
    const newImageRef = push(imagesRef);
    const imageData: GalleryImage = {
      ...image,
      id: newImageRef.key!,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await set(newImageRef, imageData);
    return { data: imageData, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const getGalleryImages = async () => {
  try {
    const imagesRef = ref(database, 'galleryImages');
    const snapshot = await get(imagesRef);
    if (snapshot.exists()) {
      const images = Object.values(snapshot.val()) as GalleryImage[];
      return { data: images.sort((a, b) => b.createdAt - a.createdAt), error: null };
    }
    return { data: [], error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const deleteGalleryImage = async (id: string) => {
  try {
    const imageRef = ref(database, `galleryImages/${id}`);
    await remove(imageRef);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Concert dates
export const addConcertDate = async (concert: Omit<ConcertDate, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const concertsRef = ref(database, 'concertDates');
    const newConcertRef = push(concertsRef);
    const concertData: ConcertDate = {
      ...concert,
      id: newConcertRef.key!,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await set(newConcertRef, concertData);
    return { data: concertData, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const getConcertDates = async () => {
  try {
    const concertsRef = ref(database, 'concertDates');
    const snapshot = await get(concertsRef);
    if (snapshot.exists()) {
      const concerts = Object.values(snapshot.val()) as ConcertDate[];
      return { data: concerts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()), error: null };
    }
    return { data: [], error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const deleteConcertDate = async (id: string) => {
  try {
    const concertRef = ref(database, `concertDates/${id}`);
    await remove(concertRef);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Site content
export const updateSiteContent = async (content: Partial<SiteContent>) => {
  try {
    const contentRef = ref(database, 'siteContent');
    await set(contentRef, { ...content, updatedAt: Date.now() });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getSiteContent = async () => {
  try {
    const contentRef = ref(database, 'siteContent');
    const snapshot = await get(contentRef);
    if (snapshot.exists()) {
      return { data: snapshot.val() as SiteContent, error: null };
    }
    return { data: null, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

// Real-time listeners
export const subscribeToAudioTracks = (callback: (tracks: AudioTrack[]) => void) => {
  const tracksRef = ref(database, 'audioTracks');
  const unsubscribe = onValue(tracksRef, (snapshot) => {
    if (snapshot.exists()) {
      const tracks = Object.values(snapshot.val()) as AudioTrack[];
      callback(tracks.sort((a, b) => b.createdAt - a.createdAt));
    } else {
      callback([]);
    }
  });
  return () => off(tracksRef, 'value', unsubscribe);
};

export const subscribeToGalleryImages = (callback: (images: GalleryImage[]) => void) => {
  const imagesRef = ref(database, 'galleryImages');
  const unsubscribe = onValue(imagesRef, (snapshot) => {
    if (snapshot.exists()) {
      const images = Object.values(snapshot.val()) as GalleryImage[];
      callback(images.sort((a, b) => b.createdAt - a.createdAt));
    } else {
      callback([]);
    }
  });
  return () => off(imagesRef, 'value', unsubscribe);
};