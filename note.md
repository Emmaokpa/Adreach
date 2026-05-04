For the authentiction  use clerk
for image uploads use image kit
for Emails use Brevo
for catalog uploads if users dont have a spreadsheet for uploading products, but have whatsapp catalog what do we do.



We are building AdReach — an AI-powered Meta ads automation platform for Nigerian 
businesses. We have a complete plan already. I need you to update the creative 
generation system with the following specific changes:

CONTEXT:
We have a plan.md file already created with the full AdReach build plan. The 
creative generation system currently references Replicate with outdated models 
(Flux Schnell, Stable Video Diffusion, Real-ESRGAN). We need to upgrade this 
entire system with better tools.

CHANGES TO MAKE:

1. REPLACE the image generation stack:
   - Remove: Replicate + Flux Schnell
   - Add: fal.ai + Flux 1.1 Pro model
   - API: https://fal.run/fal-ai/flux-pro/v1.1
   - Config: square_hd size, 4 images per generation, jpeg output
   - Install: npm install @fal-ai/client
   - Env var: FAL_API_KEY

2. REPLACE the text-to-video generation stack:
   - Remove: Replicate + Stable Video Diffusion / AnimateDiff
   - Add: Google Veo 2 via Gemini API
   - Model: veo-2.0-generate-001
   - SDK: @google/generative-ai
   - This is async — must poll for completion every 5 seconds
   - Generate 8-second clips, aspect ratio 1:1 for feed or 9:16 for Reels
   - Env var: GOOGLE_AI_API_KEY
   - Install: npm install @google/generative-ai

3. ADD image-to-video as a separate feature (animating a still photo):
   - Tool: Kling AI v1.6 Pro via fal.ai
   - API: https://fal.run/fal-ai/kling-video/v1.6/pro/image-to-video
   - This is also async — poll using request_id every 3 seconds
   - Duration: 5 seconds, aspect ratio 1:1
   - This is the most useful video feature for Nigerian businesses who 
     only have product photos, not videos
   - Same ₦5,000 add-on price as text-to-video
   - Present both options to the business: "Generate from scratch" OR 
     "Animate my photo"

4. REPLACE the photo enhancement stack:
   - Remove: Replicate + Real-ESRGAN
   - Add: Clarity Upscaler via fal.ai
   - API: https://fal.run/fal-ai/clarity-upscaler
   - Config: scale_factor 2, creativity 0.35, resemblance 1.0
   - Same ₦1,000 add-on price

5. UPDATE the environment variables — remove old ones, add new ones:
   REMOVE:
   - REPLICATE_API_KEY

   ADD:
   - FAL_API_KEY (covers Flux images, Kling video, Clarity enhancement)
   - GOOGLE_AI_API_KEY (covers Veo 2 text-to-video)

6. UPDATE the creative asset step UI in the campaign creation flow:
   The business should now see these options at the creative asset step:

   Option A — Upload your own (free, always available)
   
   Option B — AI Image Generation (add-on ₦2,500)
   Uses Flux 1.1 Pro. Generates 4 image options, business picks one.
   
   Option C — AI Video: Generate from scratch (add-on ₦5,000)
   Uses Google Veo 2. Business describes what they want. 8-second clip generated.
   
   Option D — AI Video: Animate my photo (add-on ₦5,000)
   Uses Kling AI. Business uploads or uses a generated image, platform 
   animates it into a smooth 5-second video clip. Best option for 
   businesses with product photos but no video content.
   
   Option E — Photo Enhancer (add-on ₦1,000)
   Uses Clarity Upscaler. Business uploads a blurry or low-quality phone photo, 
   platform returns a professional cleaned-up version. Show before/after preview.

7. UPDATE the lib/creative/ folder structure:
   - lib/creative/imageGenerator.ts — Flux 1.1 Pro via fal.ai
   - lib/creative/videoGenerator.ts — Veo 2 (text-to-video) + Kling (image-to-video)
   - lib/creative/imageEnhancer.ts — Clarity Upscaler via fal.ai
   All generated assets upload to Cloudinary after generation for permanent storage.

8. UPDATE the add-on pricing at Paystack checkout to show all 5 creative options:
   ☐ AI Image Pack — ₦2,500 (4 images generated, pick your favourite)
   ☐ AI Video: From scratch — ₦5,000 (8-second video generated from description)
   ☐ AI Video: Animate my photo — ₦5,000 (your photo turned into a smooth video)
   ☐ Photo Enhancer — ₦1,000 (fix blurry or dark phone photos)
   Note: Image Pack and Video are mutually exclusive — pick one creative direction.

9. UPDATE the convex/imageGeneration.ts file to handle all the new async flows:
   - Image generation: fal.ai returns synchronously (fast, no polling needed)
   - Text-to-video (Veo 2): async, poll every 5 seconds until done
   - Image-to-video (Kling): async, poll using request_id every 3 seconds
   - Enhancement: fal.ai returns synchronously (fast)
   Store generation status in the campaign record so the UI can show 
   a live progress indicator while async jobs complete.

10. The AI image prompt generation (Claude writing the image prompt based on 
    ad copy) stays exactly the same — Claude still writes the prompt, 
    we just changed which image model receives that prompt.

PRICING SUMMARY (unchanged from original plan):
- Base fee: 15% of ad spend
- Minimum fee: ₦2,000
- Maximum fee: ₦150,000
- Image add-on: ₦2,500
- Video add-on: ₦5,000 (either type)
- Enhancement add-on: ₦1,000

TECH STACK SUMMARY (full updated list):
- Frontend: Next.js 14, Tailwind CSS, shadcn/ui, Recharts, Framer Motion
- Backend: Convex (DB + crons + real-time)
- Auth: Clerk
- Payments: Paystack
- AI agents: Claude Sonnet 4 via Anthropic SDK
- Image generation: Flux 1.1 Pro via fal.ai
- Text-to-video: Google Veo 2 via Gemini API (@google/generative-ai)
- Image-to-video: Kling AI v1.6 Pro via fal.ai
- Photo enhancement: Clarity Upscaler via fal.ai
- Storage: Cloudinary
- Email: Resend
- Hosting: Vercel

Please update the plan.md file to reflect all of these changes, and also 
generate the complete updated code for these three files:
- lib/creative/imageGenerator.ts
- lib/creative/videoGenerator.ts  
- lib/creative/imageEnhancer.ts

Include full TypeScript code with proper error handling, async polling logic 
where needed, and Cloudinary upload after each generation.
