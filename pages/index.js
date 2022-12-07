import Head from "next/head";
import { useState } from "react";

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import { InputText } from 'primereact/inputtext';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputTextarea } from 'primereact/inputtextarea';

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [sqlInput, setSqlInput] = useState("");
  const [resultSQL, setSqlResult] = useState();


  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
  }

  async function onSubmit2(event1) {
    event1.preventDefault();
    const response = await fetch("/api/snowflake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql: sqlInput }),
    });
    const data = await response.json();
    setSqlResult(data.resultSQL);
    setSqlInput("");
  }

  return (
    <div>
      <Head>
        <title>Qlik Expression Converter to Power BI</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <div><img src='h_logo_white_bg.png' style={{width:'50px'}}></img></div>
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header="Metric Converter">
            <img src="/QPBI.png" />
            <h2>Qlik Expression to Power BI Converter</h2>
            <form onSubmit={onSubmit}>
              <InputText
                style={{ width: '1200px' }}
                type="text"
                name="animal"
                placeholder="Enter Qlik Expression"
                value={animalInput}
                onChange={(e) => setAnimalInput(e.target.value)}
              />
              <br /><br />
              <input type="submit" value="Convert" className='p-button' />
            </form><br />
            <div>{result}</div>
          </TabPanel>
          <TabPanel header="Script Converter">
            <img src="/QSNOW.png" />
            <h2>Qlik Script to Snowflake SQL</h2>
            <form onSubmit={onSubmit2}>
              <InputTextarea
                rows={20} cols={50}
                autoResize
                type="text"
                name="sql"
                placeholder="Enter Qlik Script"
                value={sqlInput}
                onChange={(e) => setSqlInput(e.target.value)}
              /><br /><br />
              <input type="submit" value="Convert" className='p-button' />
            </form><br />
            <div>{resultSQL}</div>
          </TabPanel>
        </TabView>
      </main>
    </div>
  );
}
