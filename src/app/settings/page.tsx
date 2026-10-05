/* eslint-disable */
'use client'
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Settings as SettingsIcon, Monitor, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  const [settings, setLocalSettings] = useState({
    fontSize: 14,
    tabSize: 2,
    wordWrap: true,
    minimap: true,
    autocomplete: true,
    terminal: true,
  });
  
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('reporank-editor-settings');
    if (saved) {
      try {
        setLocalSettings(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const updateSetting = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setLocalSettings(newSettings);
    localStorage.setItem('reporank-editor-settings', JSON.stringify(newSettings));
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 flex items-center gap-3">
          <SettingsIcon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        </header>

        <div className="space-y-8">
          <section className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 border-b border-border pb-2">Appearance</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Theme</h3>
                  <p className="text-sm text-muted-foreground">Select the UI color theme</p>
                </div>
                <div className="flex bg-secondary p-1 rounded-lg">
                  <button onClick={() => setTheme('light')} className={cn("px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2", theme === 'light' ? "bg-background shadow-sm" : "hover:bg-background/50")}>
                    <Sun className="h-4 w-4" /> Light
                  </button>
                  <button onClick={() => setTheme('dark')} className={cn("px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2", theme === 'dark' ? "bg-background shadow-sm" : "hover:bg-background/50")}>
                    <Moon className="h-4 w-4" /> Dark
                  </button>
                  <button onClick={() => setTheme('system')} className={cn("px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2", theme === 'system' ? "bg-background shadow-sm" : "hover:bg-background/50")}>
                    <Monitor className="h-4 w-4" /> System
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 border-b border-border pb-2">Editor</h2>
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Font Size</h3>
                  <p className="text-sm text-muted-foreground">Editor font size ({settings.fontSize}px)</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">12</span>
                  <input 
                    type="range" min="12" max="24" step="1" 
                    value={settings.fontSize}
                    onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
                    className="w-32 accent-primary"
                  />
                  <span className="text-sm text-muted-foreground">24</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Tab Size</h3>
                  <p className="text-sm text-muted-foreground">Number of spaces per tab</p>
                </div>
                <div className="flex bg-secondary p-1 rounded-lg">
                  <button onClick={() => updateSetting('tabSize', 2)} className={cn("px-4 py-1.5 rounded-md text-sm font-medium", settings.tabSize === 2 ? "bg-background shadow-sm" : "hover:bg-background/50")}>2</button>
                  <button onClick={() => updateSetting('tabSize', 4)} className={cn("px-4 py-1.5 rounded-md text-sm font-medium", settings.tabSize === 4 ? "bg-background shadow-sm" : "hover:bg-background/50")}>4</button>
                </div>
              </div>

              <SettingToggle 
                title="Word Wrap" 
                description="Wrap long lines in the editor"
                checked={settings.wordWrap}
                onChange={(v) => updateSetting('wordWrap', v)}
              />

              <SettingToggle 
                title="Minimap" 
                description="Show editor minimap on the right"
                checked={settings.minimap}
                onChange={(v) => updateSetting('minimap', v)}
              />

              <SettingToggle 
                title="Autocomplete" 
                description="Enable code suggestions"
                checked={settings.autocomplete}
                onChange={(v) => updateSetting('autocomplete', v)}
              />
              
              <SettingToggle 
                title="Terminal Visibility" 
                description="Show terminal by default"
                checked={settings.terminal}
                onChange={(v) => updateSetting('terminal', v)}
              />

            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function SettingToggle({ title, description, checked, onChange }: { title: string, description: string, checked: boolean, onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <button 
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
          checked ? "bg-primary" : "bg-muted"
        )}
      >
        <span className={cn("inline-block h-4 w-4 transform rounded-full bg-background transition-transform", checked ? "translate-x-6" : "translate-x-1")} />
      </button>
    </div>
  );
}
