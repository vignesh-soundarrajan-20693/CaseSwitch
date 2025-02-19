<script lang="ts">
  import { onMount } from "svelte";
  import {
    csi,
    openLinkInBrowser,
    subscribeBackgroundColor,
    evalTS,
  } from "../lib/utils/bolt";
  import { listenTS } from "../lib/utils/bolt";

  import "../index.scss";
  import "./main.scss";
  import { writable } from "svelte/store";

  const toggle1 = writable(localStorage.getItem('toggle1') === 'true' || false);
  const toggle2 = writable(localStorage.getItem('toggle2') === 'true' || false);

  toggle1.subscribe(value => localStorage.setItem('toggle1', JSON.stringify(value)));
  toggle2.subscribe(value => localStorage.setItem('toggle2', JSON.stringify(value)));

  /// sigil
  import Panel from "@battleaxe/sigil/components/Panel.svelte";
  import Fold from "@battleaxe/sigil/components/Fold.svelte";
  import Button from "@battleaxe/sigil/components/Button.svelte";
  import Row from "@battleaxe/sigil/components/Row.svelte";
  import Toggle from "@battleaxe/sigil/components/Toggle.svelte";
  import PanelInfo from "@battleaxe/sigil/components/PanelInfo.svelte";
  import Footer from "@battleaxe/sigil/components/Footer.svelte";
  import Menus from "@battleaxe/sigil/components/Menus.svelte";
  import Modal from "@battleaxe/sigil/components/Modal.svelte";
 
  import Divider from "@battleaxe/sigil/components/Divider.svelte";
  import { on } from "events";
  import app from "./main";

  export let footerMessage = "";
  export let timeout = 5000;
  export let color = "#ff0000";
  let showFooter = false;
  

  const appLocale = csi.getHostEnvironment().appLocale?.split("_")[0];
  onMount(() => {
    if (window.cep) {
      subscribeBackgroundColor((c: string) => (backgroundColor = c));
    }
  });

  let backgroundColor: string = "#202020";

  const callTransform = (transformType: string, isShift: boolean) => {
    evalTS("mainCaseSwitch", transformType, isShift)
      .then((res) => {
        console.log(
          `Transformation (${transformType}) applied successfully`,
          res
        );
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const ClearSelected = () => {
  evalTS("clearSelectedLayersOriginalText")
    .then((res) => {
      console.log("Transformation applied successfully", res);
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

const ClearGlobal = () => {
  evalTS("clearAllLayersOriginalText")
    .then((res) => {
      console.log("Transformation applied successfully", res);
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

  // Listen for the custom event and display the footer
  onMount(() => {
    listenTS("showAlert", (data) => {
      footerMessage = data.message;
      color = data.color || "#ff0000";
      timeout = data.timeout || 5000;
      showFooter = true;

      setTimeout(() => {
        showFooter = false;
      }, timeout);
    });
  });

  let showModal = false;
  const ChangeShowModal = () => {
    showModal = !showModal
  }

  onMount(() => {
    if (window.cep) {
      subscribeBackgroundColor((c: string) => (backgroundColor = c));
    }
  });
</script>

<div class="app">
  <Panel padding={10} {backgroundColor}>
    <Menus refresh locale={appLocale} />
    <Modal center={true} show={showModal} noButtons={true}>
     
      <h3>Settings - CaseSwitch</h3>
      <Divider></Divider>
      <Toggle
      label="EXCLUDE SMALL WORDS IN TITLE CASE"
      state={$toggle1}
      on:change={() => toggle1.update(value => !value)}
    />
    <br>
      
    <Toggle
    label="ADD KEYFRAMES BY HOLDING THE ALT KEY"
    state={$toggle2}
    on:change={() => toggle2.update(value => !value)}
  />
  <br>
  <Button label="Close" on:click={ChangeShowModal}></Button>
   
    </Modal>

    <Fold label="Essentials" open={true} prefsId={"foldEssentials"}>
      <Row fill={true}>
       
      
        
        <Button
          tooltip='Lowercase: "Convert text to all lowercase letters."'
          label="Lower"
          on:normalClick={() => callTransform("lowerCase", false)}
          on:shiftClick={() => callTransform("lowerCase", true)}
        />
        <Button
          tooltip='Uppercase: "Convert text to all uppercase letters."'
          label="Upper"
          on:normalClick={() => callTransform("upperCase", false)}
          on:shiftClick={() => callTransform("upperCase", true)}
        />       
       {#if $toggle1}
        <Button
        tooltip='Capital Case / Title Case: "Capitalize the first letter of each word in the text."'
        label="Title"
        on:normalClick={() => callTransform("titleCasexSW", false)}
        on:shiftClick={() => callTransform("titleCasexSW", true)}
      />   
      {:else}
      <Button
      tooltip='Capital Case / Title Case: "Capitalize the first letter of each word in the text."'
      label="Title"
      on:normalClick={() => callTransform("titleCase", false)}
      on:shiftClick={() => callTransform("titleCase", true)}
    />   
      {/if}
        <Button
          tooltip='Sentence Case: "Capitalize the first letter of the first word, leave the rest in lowercase."'
          label="Sentence"
          on:normalClick={() => callTransform("sentenceCase", false)}
          on:shiftClick={() => callTransform("sentenceCase", true)}
        />
      </Row>
    </Fold>

    <Fold label="Others" open={false} prefsId={"foldAdvanced"}>
      <Row fill={true}>
        <Button
          tooltip='Camel Case: "Convert text into camelCase (no spaces, first letter lowercase)."'
          label="Camel"
          on:normalClick={() => callTransform("camelCase", false)}
          on:shiftClick={() => callTransform("camelCase", true)}
        />
        <Button
          tooltip='Pascal Case: "Convert text into PascalCase (no spaces, first letter uppercase)."'
          label="Pascal"
          on:normalClick={() => callTransform("pascalCase", false)}
          on:shiftClick={() => callTransform("pascalCase", true)}
        />
        <Button
          tooltip='Snake Case: "Convert text into snake_case (words separated by underscores)."<br><br>Alt+Click - Screaming Snake Case / Constant Case: "Convert text into SCREAMING_SNAKE_CASE (uppercase with underscores)."'
          label="Snake"
          on:normalClick={() => callTransform("snakeCase", false)}
          on:shiftClick={() => callTransform("snakeCase", true)}
          on:altClick={() => callTransform("constantCase", $toggle2 ? true : false)}

        />
        <Button
        tooltip='Kebab Case (Hyphen Case / Train Case): "Convert text into kebab-case (words separated by hyphens)."<br><br> Alt+Click - Screaming Kebab Case / Cobol Case: "Convert text into SCREAMING-KEBAB-CASE (uppercase with hyphens)."'
        label="Kebab"
          on:normalClick={() => callTransform("kebabCase", false)}
          on:shiftClick={() => callTransform("kebabCase", true)}
          on:altClick={() => callTransform("cobolCase", $toggle2 ? true : false)}
        />
        <Button
          tooltip='Dot Case: "Convert text into dot.case (words separated by dots)."'
          label="Dot"
          on:normalClick={() => callTransform("dotCase", false)}
          on:shiftClick={() => callTransform("dotCase", true)}
        />
        <Button
          tooltip='Path Case: "Convert text into path/case (words separated by slashes)."'
          label="Path"
          on:normalClick={() => callTransform("pathCase", false)}
          on:shiftClick={() => callTransform("pathCase", true)}
        />
        <Button
          tooltip='Reverse Case: "Reverse the letter case of each character in the text."'
          label="Reverse"
          on:normalClick={() => callTransform("reverseCase", false)}
          on:shiftClick={() => callTransform("reverseCase", true)}
        />
        <Button
          tooltip='Alternating Case: "Alternate the case of each letter in the text."'
          label="Alternate"
          on:normalClick={() => callTransform("alternateCase", false)}
          on:shiftClick={() => callTransform("alternateCase", true)}
        />
        <Button
          tooltip='Random Case: "Randomly change the case of letters for a mocking effect." <br><br>Alt+Click - Random word Captaise: "Randomly change the case of words."'
          label="Random"
          on:altClick={() => callTransform("randomwordsCase", $toggle2 ? true : false)}
          on:normalClick={() => callTransform("randomCase", false)}
          on:shiftClick={() => callTransform("randomCase", true)}
          
        />
        <Button
          tooltip='Flat Case: "Remove spaces and separators, making the text a single continuous string."'
          label="Flat"
          on:normalClick={() => callTransform("flatCase", false)}
          on:shiftClick={() => callTransform("flatCase", true)}
        />
        <Button
        tooltip='Flat Case: "Remove spaces and separators, making the text a single continuous string."'
        label="Numeric to Text"
        on:normalClick={() => callTransform("numericToText", false)}
        on:shiftClick={() => callTransform("numericToText", true)}
  
      />
      </Row>
    </Fold>

    <div
      style="border-top: solid var(--fold-border-width) var(--fold-border); padding-top: 10px"
    >
      <Row fill={true}>
        <Button
          tooltip="To restore the original text"
          label="Restore"
          on:normalClick={() => callTransform("restoreOriginal", false)}
          on:shiftClick={ClearSelected}
          on:altClick={ClearGlobal}
        ></Button>
        <Button label="Settings" on:normalClick={ChangeShowModal}></Button>
      </Row>
    </div>

    <PanelInfo name="CaseSwitch" author="Vignesh Soundarrajan <3" version={"1.0"} releaseYear="2024" />

    {#if showFooter}
      <Footer {footerMessage} {timeout} {color} />
    {/if}
  </Panel>
</div>

<style>
</style>
