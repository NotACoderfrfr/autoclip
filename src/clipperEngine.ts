import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import ws from 'ws';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false }, realtime: { transport: ws } });

const geminiApiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey: geminiApiKey });

function generateViralSubtitleFile(chunks: any[], subtitlePath: string) {
  let assContent = `[Script Info]\nScriptType: v4.00+\nPlayResX: 1080\nPlayResY: 1920\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: ViralFont,"jZr�ÃR�d�dddb�d�dddb�d��d��������"��Â��R�3�3Ó������WfV�G5���f�&�C���W"�7F'B�V�B�7G��R���R��&v�����&v��"��&v��b�VffV7B�FW�E�����6�V�2�f�$V6���6�V沒����6��7B7F'E7G"�6�V��7F'C��6��7BV�E7G"�6�V��V�C���WB6�V�FW�B�6�V��FW�B�G&�҂��F�WW$66R�����b��F��&�F�҂���bbb6�V�FW�B�7ƗB�""���V�wF�����6��7Bv�&G2�6�V�FW�B�7ƗB�""���6��7E�������2d�ddbg�G�v�&G5��׵��2d�dddbg���6�V�FW�B�v�&G2����""���Т746��FV�B��F���wVS��G�7F'E7G'��G�V�E7G'��f�&�f��B������G�6�V�FW�G�����ғ��g2�w&�FTf��U7��2�7V'F�F�UF��746��FV�B���Р�7��2gV�7F���'V�6ƗW$V�v��R����6��7B�FF���"��v�B7W&6R�g&�҂v6Ɨ��u���'2r��6V�V7B�r�r��W�w7FGW2r�wVWVVBr���&FW"�v7&VFVE�Br��66V�F��s�G'VRҒ�Ɩ֗B���6��v�R�����b���"�&WGW&㰠�v�B7W&6R�g&�҂v6Ɨ��u���'2r��WFFR��7FGW3�w&�6W76��rrҒ�W�v�Br���"�B���6��7BF�v���EF��F�����&�6W72�7vB���w&u�f�FV���Br���6��7B7&�VEF��F�����&�6W72�7vB���v7&�VE�f�FV���Br���6��7B7V'F�F�UF��F�����&�6W72�7vB���w7V'F�F�W2�72r���6��7Bf���f�FV�F��F�����&�6W72�7vB���v�WGWE�6��'B��Br����G'���6��6��R���r�