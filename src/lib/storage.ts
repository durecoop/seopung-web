import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadImage(file: File, folder: string): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `web/${folder}/${Date.now()}_${safeName}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function uploadFile(file: File, folder: string): Promise<{ name: string; url: string }> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `web/${folder}/${Date.now()}_${safeName}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { name: file.name, url };
}

export async function deleteImage(url: string): Promise<void> {
  try {
    if (url.includes('firebasestorage.googleapis.com')) {
      const storageRef = ref(storage, url);
      await deleteObject(storageRef);
    }
  } catch {
    // 삭제 실패 무시 (static /images/ 경로이거나 이미 삭제됨)
  }
}
