import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Trash2, Search, Filter, Calendar, TrendingUp, TrendingDown, Target, Star, BarChart3 } from "lucide-react";
import { useState } from "react";

const TradingJournal = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);

  const journalEntries = [
    {
      id: 1,
      date: "2024-01-15",
      time: "14:30",
      title: "BTC Long Position Analysis",
      preview: "Entered BTC long at $42,500. Strong support at this level...",
      content: "Today I entered a long position on BTC at $42,500. The technical analysis showed strong support at this level with RSI oversold. My stop loss is set at $41,800 and target at $45,000. Market sentiment seems to be shifting positive after the recent consolidation period.",
      tags: ["BTC", "Long", "Technical Analysis"],
      emotion: "Confident",
      outcome: "Profitable",
      pnl: "+$750",
      isStarred: true
    },
    {
      id: 2,
      date: "2024-01-14",
      time: "09:15",
      title: "ETH Trade Review",
      preview: "Exited ETH position too early, missed significant gains...",
      content: "Closed my ETH position at $2,480 for a small profit. Looking back, I should have held longer as it reached $2,580. Need to work on my patience and let winning trades run. The FOMO got to me when I saw some negative news, but it turned out to be FUD.",
      tags: ["ETH", "Review", "Psychology"],
      emotion: "Regretful",
      outcome: "Missed Opportunity",
      pnl: "+$120",
      isStarred: false
    },
    {
      id: 3,
      date: "2024-01-13",
      time: "16:45",
      title: "SOL Scalp Trade",
      preview: "Quick scalp on SOL, good execution but small size...",
      content: "Perfect scalp trade on SOL today. Entered at $98.20 and exited at $99.80 within 2 hours. The 1.6% gain was executed well, but I realize I need to increase my position size on high-confidence setups like this one.",
      tags: ["SOL", "Scalping", "Quick Win"],
      emotion: "Satisfied",
      outcome: "Profitable",
      pnl: "+$310",
      isStarred: false
    },
    {
      id: 4,
      date: "2024-01-12",
      time: "11:20",
      title: "Risk Management Lesson",
      preview: "Avoided major loss by following my rules strictly...",
      content: "Today was a great example of why risk management is crucial. I had a strong conviction about a trade setup, but when it went against me, I stuck to my predetermined stop loss and exited for a small loss instead of hoping it would turn around. This saved me from what could have been a much larger loss as the market continued to move against the position.",
      tags: ["Risk Management", "Discipline", "Loss Prevention"],
      emotion: "Disciplined",
      outcome: "Protected Capital",
      pnl: "-$85",
      isStarred: true
    },
    {
      id: 5,
      date: "2024-01-11",
      time: "13:10",
      title: "Market Analysis - Weekly Review",
      preview: "Overall positive week, learned valuable lessons...",
      content: "This week was overall positive with a 3.2% portfolio gain. Key learnings: 1) My morning routine of checking overnight news and levels is paying off, 2) I'm getting better at identifying false breakouts, 3) Need to work on position sizing - still too conservative on high-conviction plays. Next week's focus will be on increasing size on A+ setups while maintaining strict risk control.",
      tags: ["Weekly Review", "Performance", "Goals"],
      emotion: "Optimistic",
      outcome: "Learning",
      pnl: "+$1,240",
      isStarred: true
    },
  ];

  const tradingStats = {
    totalTrades: 47,
    winRate: 68.1,
    avgWin: 245,
    avgLoss: -128,
    profitFactor: 1.8,
    maxDrawdown: -3.2
  };

  const handleSaveEntry = () => {
    if (journalEntry.trim()) {
      // Handle saving the entry
      setJournalEntry("");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="text-primary" size={20} />
          <h1 className="text-xl font-semibold text-foreground">Trading Journal</h1>
        </div>

        {/* Trading Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <Card className="bg-card border border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{tradingStats.totalTrades}</p>
                <p className="text-xs text-muted-foreground">Total Trades</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{tradingStats.winRate}%</p>
                <p className="text-xs text-muted-foreground">Win Rate</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">${tradingStats.avgWin}</p>
                <p className="text-xs text-muted-foreground">Avg Win</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-destructive">${Math.abs(tradingStats.avgLoss)}</p>
                <p className="text-xs text-muted-foreground">Avg Loss</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{tradingStats.profitFactor}</p>
                <p className="text-xs text-muted-foreground">Profit Factor</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-destructive">{tradingStats.maxDrawdown}%</p>
                <p className="text-xs text-muted-foreground">Max Drawdown</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="write" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="write">Write Entry</TabsTrigger>
            <TabsTrigger value="entries">All Entries</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="write">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
              {/* Main Journal Area */}
              <div className="lg:col-span-2">
                <Card className="h-full bg-card border border-border">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex-1 mb-4">
                      {selectedEntry ? (
                        <div className="h-full">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold text-foreground">{selectedEntry.title}</h3>
                              {selectedEntry.isStarred && <Star className="h-4 w-4 fill-primary text-primary" />}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={selectedEntry.outcome === 'Profitable' ? 'default' : selectedEntry.outcome === 'Missed Opportunity' ? 'secondary' : 'destructive'}>
                                {selectedEntry.outcome}
                              </Badge>
                              <span className={`text-sm font-medium ${selectedEntry.pnl.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                                {selectedEntry.pnl}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                            <span>{selectedEntry.date}</span>
                            <span>{selectedEntry.time}</span>
                            <Badge variant="outline" className="text-xs">{selectedEntry.emotion}</Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {selectedEntry.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                          
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <p className="text-foreground">{selectedEntry.content}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full min-h-[400px] bg-background/50 rounded-lg border border-border/50 flex items-center justify-center">
                          <div className="text-center">
                            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">Select an entry to view or start writing a new one</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Bottom input area */}
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Log your thoughts, emotions and trading rationale..."
                        value={journalEntry}
                        onChange={(e) => setJournalEntry(e.target.value)}
                        className="flex-1 min-h-[60px] bg-background border-border resize-none"
                      />
                      <Button 
                        onClick={handleSaveEntry}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
                      >
                        Save entry
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Entries Sidebar */}
              <div>
                <Card className="h-full bg-card border border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="text-primary" size={16} />
                        <h2 className="text-lg font-semibold text-foreground">Recent Entries</h2>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                      {journalEntries.map((entry) => (
                        <div 
                          key={entry.id} 
                          className={`group cursor-pointer ${selectedEntry?.id === entry.id ? 'bg-primary/10 border-primary' : ''}`}
                          onClick={() => setSelectedEntry(entry)}
                        >
                          <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-background/50 transition-colors">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-foreground">{entry.date}</span>
                                <span className="text-xs text-muted-foreground">{entry.time}</span>
                                {entry.isStarred && <Star className="h-3 w-3 fill-primary text-primary" />}
                              </div>
                              <h4 className="text-sm font-medium text-foreground mb-1">{entry.title}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">{entry.preview}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant={entry.outcome === 'Profitable' ? 'default' : 'secondary'} className="text-xs">
                                  {entry.outcome}
                                </Badge>
                                <span className={`text-xs ${entry.pnl.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                                  {entry.pnl}
                                </span>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 hover:bg-red-500/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle delete
                              }}
                            >
                              <Trash2 className="h-3 w-3 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="entries">
            <Card className="bg-card border border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">All Journal Entries</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Date Range
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {journalEntries.map((entry) => (
                    <div key={entry.id} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-foreground">{entry.title}</h4>
                            {entry.isStarred && <Star className="h-4 w-4 fill-primary text-primary" />}
                            <Badge variant={entry.outcome === 'Profitable' ? 'default' : entry.outcome === 'Missed Opportunity' ? 'secondary' : 'destructive'} className="text-xs">
                              {entry.outcome}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">{entry.preview}</p>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{entry.date} {entry.time}</span>
                            <Badge variant="outline" className="text-xs">{entry.emotion}</Badge>
                            <span className={entry.pnl.startsWith('+') ? 'text-success' : 'text-destructive'}>
                              {entry.pnl}
                            </span>
                          </div>
                          
                          <div className="flex gap-2 mt-2">
                            {entry.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedEntry(entry)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card border border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Performance by Emotion</h3>
                  <div className="space-y-4">
                    {['Confident', 'Optimistic', 'Disciplined', 'Satisfied', 'Regretful'].map((emotion) => (
                      <div key={emotion} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{emotion}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${Math.random() * 100}%` }} />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {(Math.random() * 10 - 5).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Common Tags</h3>
                  <div className="space-y-4">
                    {['BTC', 'ETH', 'Technical Analysis', 'Risk Management', 'Psychology'].map((tag) => (
                      <div key={tag} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{tag}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {Math.floor(Math.random() * 20 + 5)} entries
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {(Math.random() * 5 + 1).toFixed(1)}% avg
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TradingJournal;