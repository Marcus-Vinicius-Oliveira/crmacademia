const { exec } = require('child_process');
const port = 3001;

exec(`netstat -ano | findstr :${port}`, (err, stdout) => {
  if (err || !stdout) {
    console.log(`✔ Porta ${port} está livre.`);
    return;
  }

  const lines = stdout.trim().split('\n');
  const pids = [...new Set(lines.map(line => line.trim().split(/\s+/).pop()))];

  pids.forEach(pid => {
    exec(`taskkill /PID ${pid} /F`, (killErr) => {
      if (killErr) {
        console.error(`Erro ao encerrar PID ${pid}:`, killErr.message);
      } else {
        console.log(`✔ Processo ${pid} encerrado (porta ${port})`);
      }
    });
  });
});
