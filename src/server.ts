import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

async function main() {
  try {
    // connect with database
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(
        `App is listening on port............^^^ ${config.port} ^^^...........`,
      );
    });
  } catch (error) {
    console.error(error);
  }
}

main();
