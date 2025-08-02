export interface LessonStep {
  title: string;
  description: string;
  image_prompt: string;
  voiceover_script: string;
  image_url?: string;
  audio_url?: string;
  caption: string;
}

export interface LessonData {
  lesson_id: string;
  title: string;
  topic: string;
  age_level: string;
  difficulty: string;
  steps: LessonStep[];
  created_at: string;
}