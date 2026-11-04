import React from 'react';
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const C = {
  ink: '#0c1f1c',
  greenDark: '#003830',
  green: '#00EAB4',
  paper: '#F5F8F4',
  white: '#FFFFFF',
  muted: '#8AA89B',
  line: '#C6DCD3',
};

const font = 'Arial, Helvetica, sans-serif';
const asset = (name: string) => staticFile(`figma/${name}`);

const Fade: React.FC<{children: React.ReactNode; from?: number}> = ({children, from = 0}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [from, from + 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(frame, [from, from + 24], [30, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{opacity, transform: `translateY(${y}px)`}}>{children}</div>;
};

const Label: React.FC<{children: React.ReactNode; color?: string}> = ({children, color = C.muted}) => (
  <div style={{fontFamily: font, fontSize: 20, fontWeight: 700, letterSpacing: 2, color}}>{children}</div>
);

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 120], [0.96, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.ink, color: C.white, fontFamily: font, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,234,180,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,234,180,.07) 1px, transparent 1px)', backgroundSize: 96}} />
      <div style={{position: 'absolute', right: -150, top: 40, width: 700, height: 700, borderRadius: 999, background: 'radial-gradient(circle, rgba(0,234,180,.28), rgba(0,234,180,0) 68%)', filter: 'blur(18px)'}} />
      <div style={{position: 'absolute', left: 120, top: 100}}><Label>ERES / DESIGN SYSTEM / PILOTE 01</Label></div>
      <div style={{position: 'absolute', left: 120, top: 300, transform: `scale(${scale})`, transformOrigin: 'left top'}}>
        <Fade><div style={{fontSize: 112, fontWeight: 800, lineHeight: 1}}>Component</div></Fade>
        <Fade from={18}><div style={{fontSize: 112, fontWeight: 800, lineHeight: 1, color: C.green}}>showreel</div></Fade>
        <Fade from={38}><div style={{fontSize: 32, color: '#D4E9E0', marginTop: 42}}>Un système. Des états. Une même signature.</div></Fade>
      </div>
      <div style={{position: 'absolute', left: 120, bottom: 130, display: 'flex', gap: 18, alignItems: 'end'}}>
        {[110, 240, 360, 210, 460].map((w, i) => <div key={i} style={{height: 8, width: w, backgroundColor: '#2A6A5A', borderRadius: 10}} />)}
      </div>
      <div style={{position: 'absolute', right: 120, bottom: 100}}><Label>30 SEC / 16:9</Label></div>
    </AbsoluteFill>
  );
};

const ButtonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const lift = spring({frame, fps: 60, config: {damping: 18, stiffness: 120}});
  return (
    <AbsoluteFill style={{backgroundColor: C.paper, color: C.ink, fontFamily: font, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,56,48,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,56,48,.05) 1px, transparent 1px)', backgroundSize: 96}} />
      <div style={{position: 'absolute', left: 120, top: 96}}><Label color={C.greenDark}>01</Label><div style={{fontSize: 68, fontWeight: 800, marginTop: 34}}>BUTTON</div><div style={{fontSize: 30, color: '#4D655C', marginTop: 18}}>Variants, tailles et états.</div></div>
      <div style={{position: 'absolute', left: 780, top: 120, width: 1000, height: 760, backgroundColor: C.white, border: `2px solid ${C.line}`, borderRadius: 34, boxShadow: '0 30px 80px rgba(0,56,48,.16)', transform: `translateY(${(1-lift)*40}px)`}}>
        <div style={{position: 'absolute', left: 90, top: 80}}><Label color={C.greenDark}>PRIMARY / HOVER</Label></div>
        <div style={{position: 'absolute', left: 170, top: 220, padding: 34, borderRadius: 20, background: '#F7FAF7', border: `1px solid ${C.line}`}}><Img src={asset('button-default.png')} style={{width: 300, imageRendering: 'auto'}} /></div>
        <div style={{position: 'absolute', left: 550, top: 220, padding: 34, borderRadius: 20, background: '#F7FAF7', border: `1px solid ${C.line}`, transform: `translateY(${Math.sin(frame/18)*8}px)`}}><Img src={asset('button-hover.png')} style={{width: 300}} /></div>
        <div style={{position: 'absolute', left: 90, top: 500, display: 'grid', gridTemplateColumns: 'repeat(3, 220px)', gap: 24}}>{['primary', 'secondary', 'tertiary', 'outline', 'ghost', 'danger'].map((x, i) => <div key={x} style={{height: 52, borderRadius: 28, background: i === 0 ? '#009879' : '#ECF4EF', color: i === 0 ? C.white : C.greenDark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700}}>{x}</div>)}</div>
      </div>
      <div style={{position: 'absolute', left: 120, bottom: 100, fontSize: 28, color: C.greenDark}}>Le composant se décline sans perdre sa hiérarchie.</div>
    </AbsoluteFill>
  );
};

const TextFieldScene: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame / 10), [-1, 1], [0.96, 1.03]);
  const states = ['placeholder', 'hover', 'focus', 'filled', 'error', 'disabled'];
  const active = Math.floor(frame / 35) % states.length;
  return (
    <AbsoluteFill style={{backgroundColor: C.greenDark, color: C.white, fontFamily: font, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,234,180,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,234,180,.08) 1px, transparent 1px)', backgroundSize: 96}} />
      <div style={{position: 'absolute', left: 120, top: 96}}><Label color={C.green}>02</Label><div style={{fontSize: 68, fontWeight: 800, marginTop: 34}}>TEXTFIELD</div><div style={{fontSize: 30, color: '#C4E2D7', marginTop: 18}}>Une interaction se lit dans chaque état.</div></div>
      <div style={{position: 'absolute', left: 720, top: 120, width: 1060, height: 720, backgroundColor: '#092521', border: '2px solid #377566', borderRadius: 38, boxShadow: '0 30px 80px rgba(0,0,0,.25)'}}>
        <Img src={asset('textfield.png')} style={{position: 'absolute', left: 330, top: 170, width: 450, transform: `scale(${pulse})`}} />
        <div style={{position: 'absolute', left: 70, right: 70, bottom: 100, display: 'flex', justifyContent: 'space-between'}}>{states.map((s, i) => <div key={s} style={{height: 46, minWidth: 128, padding: '0 18px', borderRadius: 24, background: i === active ? C.green : '#16483F', color: i === active ? C.greenDark : '#C5E3D8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700}}>{s}</div>)}</div>
      </div>
      <div style={{position: 'absolute', left: 120, bottom: 100, fontSize: 28, color: C.green}}>Six états, une même logique d’interface.</div>
    </AbsoluteFill>
  );
};

const SelectScene: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.paper, color: C.ink, fontFamily: font, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 120, top: 96}}><Label color={C.greenDark}>03</Label><div style={{fontSize: 68, fontWeight: 800, marginTop: 34}}>SELECT</div><div style={{fontSize: 30, color: '#4D655C', marginTop: 18}}>Le mouvement révèle la décision.</div></div>
    <div style={{position: 'absolute', left: 690, top: 80, width: 560, height: 930, borderRadius: 38, backgroundColor: C.white, border: `2px solid ${C.line}`, boxShadow: '0 30px 80px rgba(0,56,48,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Img src={asset('select-open.png')} style={{width: 390}} /></div>
    <div style={{position: 'absolute', left: 1370, top: 260}}><div style={{fontSize: 22, fontWeight: 800, color: C.greenDark}}>Trigger</div><div style={{fontSize: 22, fontWeight: 800, color: C.greenDark, marginTop: 28}}>Dropdown</div><div style={{fontSize: 22, fontWeight: 800, color: C.greenDark, marginTop: 28}}>ListBox</div><div style={{fontSize: 36, fontWeight: 800, color: C.greenDark, marginTop: 120}}>Closed to open</div><div style={{fontSize: 30, color: '#4D655C', marginTop: 12}}>in one measured gesture.</div></div>
    <div style={{position: 'absolute', left: 120, bottom: 100, fontSize: 28, color: C.greenDark}}>Une transition qui explique l’interaction.</div>
  </AbsoluteFill>
);

const DocumentScene: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.ink, color: C.white, fontFamily: font, overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,234,180,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,234,180,.07) 1px, transparent 1px)', backgroundSize: 96}} />
    <div style={{position: 'absolute', left: 120, top: 96}}><Label color={C.green}>04</Label><div style={{fontSize: 68, fontWeight: 800, marginTop: 34}}>DOCUMENT ITEM</div><div style={{fontSize: 30, color: '#C4E2D7', marginTop: 18}}>Un composant pensé pour le produit.</div></div>
    <div style={{position: 'absolute', left: 290, top: 430, width: 1340, padding: 42, borderRadius: 34, background: '#F7FAF7', border: '2px solid #4A8B79', boxShadow: '0 30px 80px rgba(0,0,0,.3)'}}><Img src={asset('document-item.png')} style={{width: '100%'}} /></div>
    <div style={{position: 'absolute', left: 500, top: 800, display: 'flex', gap: 90}}>{['default', 'downloading', 'started', 'error'].map((s, i) => <div key={s} style={{display: 'flex', alignItems: 'center', gap: 14}}><div style={{width: 20, height: 20, borderRadius: 20, background: i === 2 ? C.green : '#417968'}} /><div style={{fontSize: 18, fontWeight: 700, color: i === 2 ? C.green : '#ABD0C1'}}>{s}</div></div>)}</div>
    <div style={{position: 'absolute', left: 120, bottom: 100, fontSize: 28, color: C.green}}>Les états deviennent un langage visuel.</div>
  </AbsoluteFill>
);

const End: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 100], [0.94, 1], {extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{backgroundColor: C.greenDark, color: C.white, fontFamily: font, overflow: 'hidden'}}><div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,234,180,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,234,180,.07) 1px, transparent 1px)', backgroundSize: 96}} /><div style={{position: 'absolute', left: 120, top: 260, transform: `scale(${scale})`, transformOrigin: 'left top'}}><div style={{fontSize: 108, fontWeight: 800}}>One system.</div><div style={{fontSize: 108, fontWeight: 800, color: C.green}}>Many states.</div></div><div style={{position: 'absolute', left: 120, bottom: 110}}><Label color='#A8CEC0'>ERES / DESIGN SYSTEM</Label></div></AbsoluteFill>;

export const EresShowreel: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={0} durationInFrames={252}><Intro /></Sequence>
    <Sequence from={252} durationInFrames={318}><ButtonScene /></Sequence>
    <Sequence from={570} durationInFrames={312}><TextFieldScene /></Sequence>
    <Sequence from={882} durationInFrames={300}><SelectScene /></Sequence>
    <Sequence from={1182} durationInFrames={300}><DocumentScene /></Sequence>
    <Sequence from={1482} durationInFrames={318}><End /></Sequence>
  </AbsoluteFill>
);
