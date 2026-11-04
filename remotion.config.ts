import {Config} from 'remotion';

Config.setCodec('h264');
Config.setCrf(16);
Config.setConcurrency(4);
Config.setOverwriteOutput(true);
