import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function CreateChallenge() {
  const [challengeData, setChallengeData] = useState({
    title: "",
    book: "",
    author: "",
    description: "",
    maxParticipants: 10,
    rules: "",
    penalty: ""
  });
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!challengeData.title || !challengeData.book || !challengeData.author || !startDate || !endDate) {
      toast({
        title: "필수 정보를 모두 입력해주세요",
        variant: "destructive"
      });
      return;
    }

    if (startDate >= endDate) {
      toast({
        title: "종료일은 시작일보다 늦어야 합니다",
        variant: "destructive"
      });
      return;
    }

    // 실제로는 서버에 챌린지 생성 요청
    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    toast({
      title: "챌린지가 생성되었습니다!",
      description: `초대코드: ${inviteCode}`
    });
    
    navigate(`/challenge/${inviteCode}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="shadow-book">
          <CardHeader>
            <CardTitle className="text-2xl">새 독서 챌린지 만들기</CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">챌린지 제목 *</Label>
                <Input
                  id="title"
                  placeholder="예: 함께 읽는 미드나잇 라이브러리"
                  value={challengeData.title}
                  onChange={(e) => setChallengeData({...challengeData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="book">책 제목 *</Label>
                  <Input
                    id="book"
                    placeholder="예: 미드나잇 라이브러리"
                    value={challengeData.book}
                    onChange={(e) => setChallengeData({...challengeData, book: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="author">작가 *</Label>
                  <Input
                    id="author"
                    placeholder="예: 매트 헤이그"
                    value={challengeData.author}
                    onChange={(e) => setChallengeData({...challengeData, author: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">챌린지 소개</Label>
                <Textarea
                  id="description"
                  placeholder="이 책을 선택한 이유나 함께 읽고 싶은 이유를 적어주세요"
                  value={challengeData.description}
                  onChange={(e) => setChallengeData({...challengeData, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>시작일 *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP", { locale: ko }) : "날짜를 선택하세요"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>종료일 *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP", { locale: ko }) : "날짜를 선택하세요"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => date < new Date() || (startDate && date <= startDate)}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxParticipants">최대 참여 인원</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  min="2"
                  max="50"
                  value={challengeData.maxParticipants}
                  onChange={(e) => setChallengeData({...challengeData, maxParticipants: parseInt(e.target.value)})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rules">챌린지 규칙</Label>
                <Textarea
                  id="rules"
                  placeholder="예: 매일 최소 10페이지 읽기, 주 3회 이상 독서 기록 남기기 등"
                  value={challengeData.rules}
                  onChange={(e) => setChallengeData({...challengeData, rules: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="penalty">페널티</Label>
                <Textarea
                  id="penalty"
                  placeholder="예: 하루 미달성 시 스터디 카페 커피 쏘기, 최종 완독 실패 시 책 구매해서 나눠주기 등"
                  value={challengeData.penalty}
                  onChange={(e) => setChallengeData({...challengeData, penalty: e.target.value})}
                  rows={2}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate('/')} className="flex-1">
                  취소
                </Button>
                <Button type="submit" className="flex-1">
                  챌린지 만들기
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}