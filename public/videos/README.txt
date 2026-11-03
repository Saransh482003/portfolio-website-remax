Drop your silent 3-5 second background clips here:
- ragner.webm (and optional ragner.mp4 fallback)
- vasccoach.webm
- curecue.webm
- navigation.webm
- heart-mlops.webm
- defect-seg.webm
- tasim.webm
- htic-systems.webm

Recommended FFmpeg command for crisp, fast-loading (<1.5 MB) 4-second silent WebM loops:
ffmpeg -i input.mp4 -t 4 -vf "scale=1280:-2,fps=30" -c:v libvpx-vp9 -b:v 0 -crf 33 -an public/videos/ragner.webm

Until a video file is placed in this folder, <AmbientVideoSlot /> automatically renders a restrained animated canvas backdrop so no broken media icons ever appear.
