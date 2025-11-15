export type Page = 'login' | 'avatarCustomization' | 'home' | 'games' | 'chat' | 'profile';

export interface AvatarConfig {
  expression: string;
  personality: string[];
  avatarStyle: string;
}

export interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const AVATAR_STYLES = ['Circle', 'Square', 'Blob', 'Robot'];

export const EXPRESSIONS = ['Calm', 'Happy', 'Thoughtful', 'Curious', 'Playful', 'Wise'];

export const PERSONALITIES = ['Gentle', 'Witty', 'Encouraging', 'Rational', 'Empathetic', 'Creative'];
