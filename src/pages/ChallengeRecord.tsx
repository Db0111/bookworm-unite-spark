import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast as useToastComment } from "@/hooks/use-toast";

// 임시 챌린지 데이터
const mockChallenge = {
  id: "1",
  title: "함께 읽는 미드나잇 라이브러리",
  book: "미드나잇 라이브러리",
  author: "매트 헤이그",
  totalPages: 200,
  currentPage: 130,
};

export default function ChallengeRecord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [recordData, setRecordData] = useState({
    startPage: "",
    endPage: "",
    content: "",
    type: "thought",
    isPublic: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recordData.startPage || !recordData.endPage || !recordData.content) {
      toast({
        title: "모든 필드를 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    const startPage = parseInt(recordData.startPage);
    const endPage = parseInt(recordData.endPage);

    if (startPage > endPage) {
      toast({
        title: "시작 페이지는 끝 페이지보다 작아야 합니다",
        variant: "destructive",
      });
      return;
    }

    if (endPage > mockChallenge.totalPages) {
      toast({
        title: `페이지 번호는 ${mockChallenge.totalPages}페이지를 초과할 수 없습니다`,
        variant: "destructive",
      });
      return;
    }

    // 실제로는 서버에 기록 저장
    toast({
      title: "독서 기록이 저장되었습니다!",
      description: "다른 참여자들과 함께 나누어요.",
    });

    navigate(`/challenge/${id}`);
  };

  const getRecordTypeLabel = (type: string) => {
    switch (type) {
      case "quote":
        return "인상 깊은 문장";
      case "thought":
        return "나의 생각";
      case "question":
        return "궁금한 점";
      case "summary":
        return "내용 정리";
      default:
        return "나의 생각";
    }
  };

  const getRecordTypeDescription = (type: string) => {
    switch (type) {
      case "quote":
        return "책에서 인상 깊었던 문장이나 구절을 공유해보세요";
      case "thought":
        return "읽으면서 든 생각이나 감상을 자유롭게 적어보세요";
      case "question":
        return "읽으면서 궁금했던 점이나 토론하고 싶은 내용을 적어보세요";
      case "summary":
        return "읽은 내용을 간단히 정리해보세요";
      default:
        return "읽으면서 든 생각이나 감상을 자유롭게 적어보세요";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Challenge Info */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">{mockChallenge.title}</h1>
                <p className="text-muted-foreground">
                  {mockChallenge.book} - {mockChallenge.author}
                </p>
              </div>
              <Badge variant="outline">
                {mockChallenge.currentPage}/{mockChallenge.totalPages}p
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Record Form */}
        <Card className="shadow-book">
          <CardHeader>
            <CardTitle className="text-2xl">독서 기록 작성</CardTitle>
            <p className="text-muted-foreground">
              오늘 읽은 내용을 기록하고 다른 참여자들과 공유해보세요.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 읽은 페이지 범위 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startPage">시작 페이지 *</Label>
                  <Input
                    id="startPage"
                    type="number"
                    min="1"
                    max={mockChallenge.totalPages}
                    placeholder="예: 120"
                    value={recordData.startPage}
                    onChange={(e) =>
                      setRecordData({
                        ...recordData,
                        startPage: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endPage">끝 페이지 *</Label>
                  <Input
                    id="endPage"
                    type="number"
                    min="1"
                    max={mockChallenge.totalPages}
                    placeholder="예: 130"
                    value={recordData.endPage}
                    onChange={(e) =>
                      setRecordData({ ...recordData, endPage: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* 기록 유형 선택 */}
              <div className="space-y-2">
                <Label>기록 유형 *</Label>
                <Select
                  value={recordData.type}
                  onValueChange={(value) =>
                    setRecordData({ ...recordData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thought">💭 나의 생각</SelectItem>
                    <SelectItem value="quote">📝 인상 깊은 문장</SelectItem>
                    <SelectItem value="question">❓ 궁금한 점</SelectItem>
                    <SelectItem value="summary">📋 내용 정리</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {getRecordTypeDescription(recordData.type)}
                </p>
              </div>

              {/* 기록 내용 */}
              <div className="space-y-2">
                <Label htmlFor="content">
                  {getRecordTypeLabel(recordData.type)} *
                </Label>
                <Textarea
                  id="content"
                  placeholder={
                    recordData.type === "quote"
                      ? "인상 깊었던 문장이나 구절을 인용해주세요..."
                      : recordData.type === "question"
                      ? "궁금한 점이나 토론하고 싶은 내용을 적어주세요..."
                      : recordData.type === "summary"
                      ? "읽은 내용을 간단히 요약해주세요..."
                      : "읽으면서 든 생각이나 감상을 자유롭게 적어주세요..."
                  }
                  value={recordData.content}
                  onChange={(e) =>
                    setRecordData({ ...recordData, content: e.target.value })
                  }
                  rows={6}
                  className="resize-none"
                />
              </div>

              {/* 공개 설정 */}
              <div className="space-y-2">
                <Label>공개 설정</Label>
                <Select
                  value={recordData.isPublic ? "public" : "private"}
                  onValueChange={(value) =>
                    setRecordData({
                      ...recordData,
                      isPublic: value === "public",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">🌐 참여자들과 공유</SelectItem>
                    <SelectItem value="private">🔒 나만 보기</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {recordData.isPublic
                    ? "다른 참여자들이 이 기록을 볼 수 있습니다"
                    : "이 기록은 나만 볼 수 있습니다"}
                </p>
              </div>

              {/* 진행률 표시 */}
              {recordData.endPage && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">예상 진행률</h4>
                  <div className="text-sm text-muted-foreground">
                    {parseInt(recordData.endPage) || 0}페이지 /{" "}
                    {mockChallenge.totalPages}페이지 (
                    {Math.round(
                      ((parseInt(recordData.endPage) || 0) /
                        mockChallenge.totalPages) *
                        100
                    )}
                    %)
                  </div>
                </div>
              )}

              {/* 제출 버튼 */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(`/challenge/${id}`)}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button type="submit" className="flex-1">
                  기록 저장하기
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 유용한 팁 */}
        <Card className="mt-6 border-accent/20 bg-accent/5">
          <CardContent className="pt-6">
            <h4 className="font-medium mb-2">💡 독서 기록 작성 팁</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 인상 깊은 문장: 페이지 번호와 함께 정확히 인용해주세요</li>
              <li>• 나의 생각: 개인적인 경험이나 감정과 연결해서 적어보세요</li>
              <li>
                • 궁금한 점: 다른 참여자들과 토론할 수 있는 질문을 던져보세요
              </li>
              <li>
                • 내용 정리: 주요 사건이나 인물의 변화를 간단히 요약해보세요
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 댓글/스레드 */}
        <CommentThread />
      </main>
    </div>
  );
}

function CommentThread() {
  const { toast } = useToastComment();
  // 임시 댓글 데이터 (상태 기반)
  const [comments, setComments] = useState([
    {
      id: 1,
      user: { name: "홍길동" },
      content: "이 부분 정말 인상 깊네요!",
      createdAt: new Date(Date.now() - 1000 * 60 * 60),
      replies: [
        {
          id: 11,
          user: { name: "김철수" },
          content: "저도요!",
          createdAt: new Date(Date.now() - 1000 * 60 * 30),
        },
      ],
    },
    {
      id: 2,
      user: { name: "이영희" },
      content: "여기서 궁금한 점이 있어요.",
      createdAt: new Date(Date.now() - 1000 * 60 * 10),
      replies: [],
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const currentUser = "나";

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        user: { name: currentUser },
        content: newComment,
        createdAt: new Date(),
        replies: [],
      },
    ]);
    setNewComment("");
  };

  const handleAddReply = (commentId: number) => {
    if (!replyContent.trim()) return;
    setComments(
      comments.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: [
                ...c.replies,
                {
                  id: Date.now(),
                  user: { name: currentUser },
                  content: replyContent,
                  createdAt: new Date(),
                },
              ],
            }
          : c
      )
    );
    setReplyTo(null);
    setReplyContent("");
  };

  const handleReport = (userName: string) => {
    toast({
      title: `${userName}님을 신고했습니다.`,
      description: "신고가 접수되었습니다.",
    });
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter((c) => c.id !== commentId));
  };
  const handleDeleteReply = (commentId: number, replyId: number) => {
    setComments(
      comments.map((c) =>
        c.id === commentId
          ? { ...c, replies: c.replies.filter((r) => r.id !== replyId) }
          : c
      )
    );
  };

  function formatTime(date: Date) {
    const diff = (Date.now() - date.getTime()) / 1000;
    if (diff < 60) return "방금 전";
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return date.toLocaleDateString();
  }

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">💬 댓글</h3>
      <div className="space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="border-b pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Avatar className="w-7 h-7 text-xs">
                <AvatarFallback>{c.user.name[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">{c.user.name}</span>
              <span className="text-xs text-muted-foreground ml-1">
                {formatTime(c.createdAt)}
              </span>
              {c.user.name === currentUser && (
                <button
                  onClick={() => handleDeleteComment(c.id)}
                  className="ml-2 text-xs text-gray-400 hover:underline"
                >
                  삭제
                </button>
              )}
              <button
                onClick={() => handleReport(c.user.name)}
                className="ml-2 text-xs text-red-500 hover:underline"
              >
                신고
              </button>
            </div>
            <div className="ml-9 text-sm mb-2">{c.content}</div>
            <div className="ml-9">
              {c.replies.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-2 mb-1 pl-4 border-l-2 border-gray-200"
                >
                  <Avatar className="w-6 h-6 text-xs">
                    <AvatarFallback>{r.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-xs">{r.user.name}</span>
                  <span className="text-xs text-muted-foreground ml-1">
                    {formatTime(r.createdAt)}
                  </span>
                  <span className="ml-2 text-xs">{r.content}</span>
                  {r.user.name === currentUser && (
                    <button
                      onClick={() => handleDeleteReply(c.id, r.id)}
                      className="ml-2 text-xs text-gray-400 hover:underline"
                    >
                      삭제
                    </button>
                  )}
                  <button
                    onClick={() => handleReport(r.user.name)}
                    className="ml-2 text-xs text-red-400 hover:underline"
                  >
                    신고
                  </button>
                </div>
              ))}
              {replyTo === c.id ? (
                <div className="flex gap-2 mt-2 pl-4">
                  <Input
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="답글을 입력하세요"
                    className="h-8 text-xs"
                  />
                  <Button size="sm" onClick={() => handleAddReply(c.id)}>
                    등록
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setReplyTo(null)}
                  >
                    취소
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  className="mt-1 text-xs"
                  onClick={() => setReplyTo(c.id)}
                >
                  답글
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-6">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          className="h-10"
        />
        <Button onClick={handleAddComment}>댓글 등록</Button>
      </div>
    </div>
  );
}
