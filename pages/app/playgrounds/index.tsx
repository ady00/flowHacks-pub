/* eslint-disable react-hooks/rules-of-hooks */
import NoteTag from '@/components/note/NoteTag';
import SearchInput from '@/components/playground/SearchInput';
import fetcher from '@/lib/fetcher';
import { UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { CodePlayground } from '@prisma/client';
import DashboardLayout from 'layouts/DashboardLayout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Fuse from 'fuse.js';
import Skeleton from 'react-loading-skeleton';
import Head from 'next/head';
import * as Checkbox from '@radix-ui/react-checkbox';
import { HiCheck } from 'react-icons/hi';
import TagPlaygroundViewer from '@/components/playground/TagPlaygroundViewer';
import searchTags from '@/lib/search-tags';
import getUniquePlaygroundTags from '@/lib/get-unique-playground-tags';
import getPlaygroundsDataByTags from '@/lib/get-playgrounds-data-by-tags';
import PlaygroundCard from '@/components/playground/PlaygroundCard';
import Editor from "@monaco-editor/react";
import * as Tabs from "@radix-ui/react-tabs";
// @ts-ignore
import ReactSrcDocIframe from "react-srcdoc-iframe";
// import * as Popover from "@radix-ui/react-popover";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
// @ts-ignore
import htmltojsx from "html-2-jsx";
//import Logo from '@/public/logos/logo-transparent.png'; 

const index: React.FC<{ user: UserProfile }> = ({ user }) => {
  const { data: playgrounds } = useSWR<CodePlayground[]>(
    '/api/playground/get-all-playgrounds',
    fetcher
  );

  const [tab, setTab] = useState<"html" | "css" | "js">("html");
  const [htmlCode, setHtmlCode] = useState<string>(
    `
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
<div class="text-center mt-5 px-5">
<h1>Welcome!</h1>
    <div class="mt-5">
        <table class="table table-striped table-dar border border-5 rounded-3">
         <thead>
            <tr>
                <td><strong>Shortcut</strong></td>
                <td><strong>Function</strong></td>
            </tr> 
         </thead>
            <tr>
                <td>Cmd/Ctrl + S</td>
                <td>Save code</td>
            </tr>
            <tr>
                <td>Cmd/Ctrl + 1</td>
                <td>Go to HTML tab</td>
            </tr>
            <tr>
                <td>Cmd/Ctrl + 2</td>
                <td>Go to CSS tab</td>
            </tr>
            <tr>
                <td>Cmd/Ctrl + 1</td>
                <td>Go to JS tab</td>
            </tr>
            <tr>
                <td>Cmd/Ctrl + 4</td>
                <td>Copy current tab's code</td>
            </tr>
        </table>
    </div>
</div>
	`
  );
  const [cssCode, setCssCode] = useState<string>(`
  table {
    border-collapse: separate !important;
}
table td {
    border: 1px solid lightgray;
}
table thead td {
    border: 2px solid transparent;
}
`);
  const [jsCode, setJsCode] = useState<string>("console.log('Hello World!');");

  

  const finalCode = {
    html: htmlCode,
    css: cssCode,
    js: jsCode,
  };

  const [isDragging, setIsDragging] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [isSortedBasedOnTagsChecked, setIsSortedBasedOnTagsChecked] =
    useState<boolean>(false);

  useEffect(() => {
    setIsSortedBasedOnTagsChecked(
      JSON.parse(localStorage.getItem('isPlaygroundsSorted')) || false
    );
  }, []);

  const fuse = new Fuse(playgrounds, {
    keys: ['playgroundName', 'html', 'css', 'js'],
    includeMatches: true,
    useExtendedSearch: true,
  });

  const results = inputValue ? fuse.search(inputValue) : playgrounds;

  const searchedPlaygrounds = searchTags(
    getUniquePlaygroundTags(playgrounds),
    inputValue
  );

  return (
    <div className="w-screen h-screen overflow-hidden">
      <SplitterLayout
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}>
        <div className="h-screen border-r-2 border-gray-500">
          <Tabs.Root
            defaultValue="html"
            value={tab}
            // @ts-ignore
            onValueChange={(tab) => setTab(tab)}>
            <Tabs.List>
              <div className="flex flex-wrap items-center justify-around nav">
              <div style={{ zoom: '0.8' }}>
                <Link href='/app'>
                <a>
                  <div style={{ zoom: 1.2 }}>
                    <h1><b>Home</b></h1>
                  </div>
                </a>
                </Link>
      </div>
                <Tabs.Trigger
                  className={`px-5 border py-1 hover:bg-gray-100 border-gray-300 rounded my-2 cursor-pointer ${
                    tab === "html" &&
                    "ring-2 ring-offset-1 shadow ring-gray-700"
                  }`}
                  value="html"
                  title="Cmd/Ctrl + 1">
                  HTML
                </Tabs.Trigger>
                <Tabs.Trigger
                  className={`px-5 border py-1 hover:bg-gray-100 border-gray-300 rounded my-2 cursor-pointer ${
                    tab === "css" && "ring-2 ring-offset-1 shadow ring-gray-700"
                  }`}
                  value="css"
                  title="Cmd/Ctrl + 2">
                  CSS
                </Tabs.Trigger>
                <Tabs.Trigger
                  className={`px-5 border py-1 hover:bg-gray-100 border-gray-300 rounded my-2 cursor-pointer ${
                    tab === "js" && "ring-2 ring-offset-1 shadow ring-gray-700"
                  }`}
                  value="js"
                  title="Cmd/Ctrl + 3">
                  JS
                </Tabs.Trigger>
                <div>
                  <button
                    id="copy-btn"
                    className="px-5 py-1 my-2 bg-gray-100 border border-gray-300 rounded cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      const btn = document.getElementById("copy-btn");
                      // @ts-ignore
                      btn.innerHTML = "Copied!";
                      setTimeout(() => {
                        // @ts-ignore
                        btn.innerHTML = "Save to Clipboard";
                      }, 1000);
                    }}
                    title="Cmd/Ctrl + 4">
                    Save to Clipboard
                  </button>
                </div>
                <div>
                </div>
                <div>
                  <button
                    id="save-btn"
                    className="px-5 py-1 my-2 bg-gray-900 rounded shadow cursor-pointer hover:bg-gray-700 text-gray-50"
                    title="Cmd/Ctrl + S">
                    Save
                  </button>
                </div>
                {/* <div>
                  <Popover.Root>
                    <Popover.Trigger>
                      <button
                        id="save-btn"
                        className="px-3 py-1 my-2 border border-gray-500 rounded cursor-pointer bg-gray-50 hover:bg-gray-100 "
                        title="More options">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"></path>
                        </svg>
                      </button>
                    </Popover.Trigger>
                    <Popover.Anchor />
                    <Popover.Content>
                      <div className="px-5 py-2 bg-white border border-gray-600 rounded shadow-xl">
                        Hello 👋
                      </div>
                      <Popover.Close />
                      <Popover.Arrow />
                    </Popover.Content>
                  </Popover.Root>
                </div> */}
              </div>
            </Tabs.List>
            <Tabs.Content value="html">
              <div id="html-div">
                <Editor
                  height="95vh"
                  language="html"
                  theme="vs-dark"
                  value={htmlCode}
                  options={{
                    fontSize: "14px",
                    cursorWidth: "2px",
                    cursorSmoothCaretAnimation: true,
                  }}
                  // @ts-ignore
                  onChange={(val, e) => setHtmlCode(val)}
                />
              </div>
            </Tabs.Content>
            <Tabs.Content value="css">
              <div id="css-div">
                <Editor
                  height="95vh"
                  language="css"
                  theme="vs-dark"
                  value={cssCode}
                  options={{
                    fontSize: "14px",
                    cursorWidth: "2px",
                    cursorSmoothCaretAnimation: true,
                  }}
                  // @ts-ignore
                  onChange={(val, e) => setCssCode(val)}
                />
              </div>
            </Tabs.Content>
            <Tabs.Content value="js">
              <div id="js-div">
                <Editor
                  height="95vh"
                  language="javascript"
                  theme="vs-dark"
                  value={jsCode}
                  options={{
                    fontSize: "14px",
                    cursorWidth: "2px",
                    cursorSmoothCaretAnimation: true,
                  }}
                  // @ts-ignore
                  onChange={(val, e) => setJsCode(val)}
                />
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
        <div className="w-full h-full">
          {isDragging && <div className="absolute w-full h-full"></div>}
          <ReactSrcDocIframe
            srcDoc={`
						<!DOCTYPE html>
						<html>
							<head>
								<title>Hello Page</title>
								<style>${finalCode.css}</style>
							</head>
							<body>
									${finalCode.html}
									<script>${finalCode.js}</script>
							</body>
						</html>
						`}
            title="ReactSrcDocIframe"
            height="100%"
            allowFullScreen
            allowScriptAccess="always"
            frameBorder="0"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>
      </SplitterLayout>
      <style>{`
			.nav > * {
					margin-right: 6px;
				}
			`}</style>
    </div>
  );
};

export default withPageAuthRequired(index);
