import {Config} from '@remotion/cli/config';

Config.setCodec('h264');
Config.setCrf(16);
Config.setConcurrency(4);
Config.setOverwriteOutput(true);
