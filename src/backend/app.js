import { NeonClient} from 'neon-sdk';
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID, TOKEN } = process.env;

const neonClient = new NeonClient({
    TOKEN: TOKEN
});
(async () => {
    const projects =await neonClient.project.listProjects();
    console.log(projects);
})();


const sql = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: 'require',
    connection: {
        options: `project=${ENDPOINT_ID}`,
    },
});
async function getPgVersion() {
    const result = await sql`select version()`;
    console.log(result);
}

getPgVersion();