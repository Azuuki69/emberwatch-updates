// Public build scaffold. Downloads only the already-public compiled game bundle.
// No private game repository, source checkout, signing secrets or paid service.
import fs from 'node:fs';
import {createHash,createPublicKey,verify} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import key from './update-key.json' with {type:'json'};
const repo='Azuuki69/emberwatch-updates';
const requested=process.env.GAME_RELEASE||'latest';
const headers={'Accept':'application/vnd.github+json','User-Agent':'Emberwatch-iOS-build',...(process.env.GH_TOKEN?{'Authorization':`Bearer ${process.env.GH_TOKEN}`}:{})};
async function json(url){const r=await fetch(url,{headers});if(!r.ok)throw Error(`HTTP ${r.status} reading release metadata`);return r.json();}
const release=await json(`https://api.github.com/repos/${repo}/releases/${requested==='latest'?'latest':`tags/${encodeURIComponent(requested)}`}`);
const asset=release.assets.find(a=>a.name==='manifest.json');if(!asset)throw Error('Release has no signed game manifest');
const envelope=await (await fetch(asset.browser_download_url)).json();
if(!verify('RSA-SHA256',Buffer.from(envelope.payload),createPublicKey({key,format:'jwk'}),Buffer.from(envelope.signature,'base64')))throw Error('Game update signature failed');
const p=JSON.parse(envelope.payload);if(p.app!=='com.emberwatch.game'||p.nativeBuild!==2)throw Error('Incompatible native build');
const url=new URL(p.url);if(url.protocol!=='https:'||url.hostname!=='github.com'||!url.pathname.startsWith(`/${repo}/releases/download/`))throw Error('Unexpected bundle address');
const response=await fetch(p.url);if(!response.ok)throw Error('Bundle download failed');const bundle=Buffer.from(await response.arrayBuffer());if(createHash('sha256').update(bundle).digest('hex')!==p.checksum)throw Error('Bundle checksum failed');
fs.writeFileSync('game.zip',bundle);fs.mkdirSync('dist',{recursive:true});execFileSync('unzip',['-q','game.zip','-d','dist']);
fs.writeFileSync('package.json',JSON.stringify({name:'emberwatch-ios-build',private:true,type:'module',dependencies:{'@capacitor/core':'8.5.3','@capacitor/ios':'8.5.3','@capacitor/app':'8.1.2','@capacitor/geolocation':'8.2.4','@capgo/capacitor-updater':'8.54.0'},devDependencies:{'@capacitor/cli':'8.5.3'}}));
execFileSync('npm',['install','--no-audit','--no-fund'],{stdio:'inherit'});
fs.copyFileSync('build-ios/capacitor.config.json','capacitor.config.json');
execFileSync('npx',['cap','add','ios'],{stdio:'inherit'});
let plist=fs.readFileSync('ios/App/App/Info.plist','utf8');const text='Emberwatch uses your location while you play to discover nearby landmarks and check that you are close enough to claim them. Your location is never shared with guild members.';
plist=plist.replace('<dict>',`<dict>\n<key>NSLocationWhenInUseUsageDescription</key><string>${text}</string>\n<key>NSLocationAlwaysAndWhenInUseUsageDescription</key><string>${text}</string>`);fs.writeFileSync('ios/App/App/Info.plist',plist);
const project='ios/App/App.xcodeproj/project.pbxproj';let pbx=fs.readFileSync(project,'utf8').replaceAll('CURRENT_PROJECT_VERSION = 1;','CURRENT_PROJECT_VERSION = 2;').replaceAll('MARKETING_VERSION = 1.0;','MARKETING_VERSION = 0.1.1;');fs.writeFileSync(project,pbx);
fs.copyFileSync('build-ios/AppIcon.png','ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png');
for(const file of ['splash-2732x2732.png','splash-2732x2732-1.png','splash-2732x2732-2.png'])fs.copyFileSync('dist/art/lantern-valley.png','ios/App/App/Assets.xcassets/Splash.imageset/'+file);
fs.mkdirSync('output',{recursive:true});fs.writeFileSync('output/release-tag.txt',release.tag_name);fs.writeFileSync('output/game-version.txt',p.version);
console.log(`Verified game ${p.version}; prepared iOS native build 2 from public compiled assets.`);
