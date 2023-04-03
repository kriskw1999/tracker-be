-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "recurrent" BOOLEAN NOT NULL DEFAULT false,
    "taskBoardId" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskBoard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "TaskBoard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskBoardId_fkey" FOREIGN KEY ("taskBoardId") REFERENCES "TaskBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
